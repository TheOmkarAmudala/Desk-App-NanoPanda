import React, { useRef, useState } from "react";

import {
    ShieldCheck,
    Camera,
    Lock
} from "lucide-react";

import {
    motion,
    AnimatePresence
} from "framer-motion";

import { invoke } from "@tauri-apps/api/core";

import AccessConsent from "./AppConsentScreen";

export default function VerificationOverlay() {

    const videoRef = useRef(null);

    const canvasRef = useRef(null);

    const [cameraStarted,
        setCameraStarted] =
        useState(false);

    const [showConsent,
        setShowConsent] =
        useState(false);

    const [showAccessConsent,
        setShowAccessConsent] =
        useState(false);

    const verificationAngles = [

        "Look Straight",
        "Turn Slightly Left",
        "Turn Slightly Right",
        "Look Up",
        "Look Down",
        "Move Closer",
        "Move Slightly Back",
        "Neutral Expression",
        "Slight Smile",
        "Tilt Head Left",
        "Tilt Head Right",
        "Final Verification"
    ];

    const [currentAngleIndex,
        setCurrentAngleIndex] =
        useState(0);

    const [capturedCount,
        setCapturedCount] =
        useState(0);

    const startCamera = async () => {

        try {

            const stream =
                await navigator
                    .mediaDevices
                    .getUserMedia({

                        video: true,
                        audio: false
                    });

            const video =
                videoRef.current;

            if (!video) return;

            video.srcObject =
                stream;

            video.muted = true;

            video.playsInline = true;

            video.autoplay = true;

            await new Promise(resolve =>
                setTimeout(resolve, 300)
            );

            await video.play();

            video.style.display =
                "block";

            setCameraStarted(true);

        } catch (err) {

            console.error(
                "CAMERA ERROR:",
                err
            );
        }
    };

    const captureFrame = async () => {

        try {

            const video =
                videoRef.current;

            const canvas =
                canvasRef.current;

            if (!video || !canvas)
                return;

            const context =
                canvas.getContext("2d");

            canvas.width =
                video.videoWidth;

            canvas.height =
                video.videoHeight;

            context.drawImage(
                video,
                0,
                0,
                canvas.width,
                canvas.height
            );

            const image =
                canvas.toDataURL(
                    "image/jpeg",
                    0.95
                );

            const response =
                await invoke(
                    "save_face_embedding",
                    {
                        imageData: image
                    }
                );

            console.log(response);

            setCapturedCount(
                prev => prev + 1
            );

            if (
                currentAngleIndex <
                verificationAngles.length - 1
            ) {

                setCurrentAngleIndex(
                    prev => prev + 1
                );

            } else {

                alert(
                    "Verification Enrollment Completed"
                );
            }

        } catch (err) {

            console.error(err);
        }
    };

    return (

        <AnimatePresence mode="wait">

            {!showAccessConsent ? (

                <motion.div

                    key="verification"

                    initial={{
                        opacity: 0,
                        y: 0
                    }}

                    animate={{
                        opacity: 1,
                        y: 0
                    }}

                    exit={{
                        opacity: 0,
                        y: 180,
                        scale: 0.96
                    }}

                    transition={{
                        duration: 0.9,
                        ease: [0.22, 1, 0.36, 1]
                    }}

                    className="relative min-h-screen w-full bg-[#08090b] overflow-hidden flex items-center justify-center px-4 md:px-6 py-12 md:py-20 text-white font-sans"
                >

                    {/* Ambient Background */}

                    <div className="absolute inset-0 overflow-hidden">

                        <div className="absolute top-[10%] left-[20%] w-[320px] h-[320px] bg-[#f06e28]/8 blur-[120px] rounded-full" />

                        <div className="absolute bottom-[-10%] right-[10%] w-[300px] h-[300px] bg-orange-500/5 blur-[120px] rounded-full" />

                    </div>

                    {/* Main Container */}

                    <motion.div

                        initial={{
                            opacity: 0,
                            y: 18
                        }}

                        animate={{
                            opacity: 1,
                            y: 0
                        }}

                        transition={{
                            duration: 0.5
                        }}

                        className="relative z-10 w-full max-w-none px-6 md:px-12 lg:px-20 xl:px-28 rounded-[14px] md:rounded-[28px] border border-white/8 bg-white/[0.03] backdrop-blur-2xl overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.45)]"
                    >

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">

                            {/* LEFT */}

                            <div className="p-6 md:p-10 border-b lg:border-b-0 lg:border-r border-white/8">

                                <div className="flex items-center gap-3">

                                    <div className="w-10 h-10 rounded-2xl bg-[#f06e28]/10 border border-[#f06e28]/15 flex items-center justify-center">

                                        <ShieldCheck
                                            size={18}
                                            className="text-[#f06e28]"
                                        />

                                    </div>

                                    <div>

                                        <h1 className="text-lg font-semibold tracking-tight">

                                            NANOPANDA

                                        </h1>

                                        <p className="text-sm text-white/40">

                                            Adaptive Identity Verification

                                        </p>

                                    </div>

                                </div>

                                <div className="mt-8 md:mt-12">

                                    <h2 className="text-2xl md:text-3xl lg:text-[42px] leading-[1.05] tracking-[-0.04em] font-semibold max-w-xl">

                                        Verify your identity to continue

                                    </h2>

                                    <p className="mt-4 md:mt-6 text-[14px] md:text-[15px] leading-7 text-white/55 max-w-lg">

                                        To protect sensitive workspace access,
                                        NanoPanda performs a secure identity
                                        verification check before continuing.

                                    </p>

                                </div>

                                {/* STATUS */}

                                <div className="mt-8 md:mt-10">

                                    <div className="flex items-center justify-between">

                                        <div>

                                            <p className="text-sm uppercase tracking-[0.18em] text-white/35">

                                                Verification Progress

                                            </p>

                                            <h3 className="mt-2 text-xl md:text-2xl font-semibold tracking-tight">

                                                {verificationAngles[currentAngleIndex]}

                                            </h3>

                                        </div>

                                        <div className="text-right">

                                            <p className="text-2xl md:text-3xl font-semibold text-[#f06e28]">

                                                {capturedCount}/12

                                            </p>

                                            <p className="text-sm text-white/35">

                                                Captures Completed

                                            </p>

                                        </div>

                                    </div>

                                    <div className="mt-4 md:mt-6 h-2 rounded-full bg-white/5 overflow-hidden">

                                        <motion.div

                                            animate={{
                                                width: `${((capturedCount) / 12) * 100}%`
                                            }}

                                            transition={{
                                                duration: 0.4
                                            }}

                                            className="h-full bg-[#f06e28]"
                                        />

                                    </div>

                                </div>

                                {/* CAMERA */}

                                <div className="mt-8 md:mt-12">

                                    <div className="relative aspect-[1.2/1] rounded-[30px] overflow-hidden border border-white/8 bg-[#0d0f13]">

                                        <div className="absolute inset-0">

                                            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-44 md:w-52 h-44 md:h-52 bg-[#f06e28]/10 blur-[90px] rounded-full" />

                                        </div>

                                        <div className="absolute inset-0 flex items-center justify-center">

                                            <motion.div
                                                animate={{
                                                    borderColor: [
                                                        "rgba(240,110,40,0.15)",
                                                        "rgba(240,110,40,0.35)",
                                                        "rgba(240,110,40,0.15)",
                                                    ],
                                                }}
                                                transition={{
                                                    duration: 4,
                                                    repeat: Infinity,
                                                    ease: "easeInOut",
                                                }}
                                                className="relative w-[220px] sm:w-[260px] md:w-[320px] lg:w-[360px] h-[280px] md:h-[360px] rounded-[28px] border overflow-hidden bg-black"
                                             >

                                                <video

                                                    ref={videoRef}

                                                    autoPlay

                                                    playsInline

                                                    muted

                                                    className={`absolute inset-0 w-full h-full object-cover bg-black ${
                                                        cameraStarted ? "block" : "hidden"
                                                    }`}
                                                />

                                                {!cameraStarted && (

                                                    <div className="flex items-center justify-center h-full">

                                                        <div className="text-center px-4">

                                                            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center mx-auto">

                                                                <Camera
                                                                    size={24}
                                                                    className="text-white/50"
                                                                />

                                                            </div>

                                                            <p className="mt-4 md:mt-5 text-sm leading-6 text-white/45">

                                                                Camera access starts only after verification begins

                                                            </p>

                                                        </div>

                                                    </div>
                                                )}

                                                <canvas
                                                    ref={canvasRef}
                                                    className="hidden"
                                                />

                                            </motion.div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                            {/* RIGHT */}

                            <div className="p-6 md:p-10 flex flex-col justify-between bg-white/[0.02]">

                                <div>

                                    <div className="flex items-center gap-2 text-sm text-white/40 uppercase tracking-[0.18em]">

                                        <Lock size={14} />

                                        Privacy & Security

                                    </div>

                                </div>

                                {/* BUTTONS */}

                                <div className="mt-8 md:mt-14">

                                    <button

                                        onClick={() => {

                                            if (!cameraStarted) {

                                                setShowConsent(true);

                                            } else {

                                                captureFrame();

                                            }

                                        }}

                                        className="w-full h-12 md:h-14 rounded-2xl bg-[#f06e28] hover:bg-[#ff7f3f] transition-all duration-300 font-medium"
                                    >

                                        {cameraStarted
                                            ? "Capture Verification"
                                            : "Continue Verification"}

                                    </button>

                                    <button

                                        onClick={() => {

                                            setShowAccessConsent(true);

                                        }}

                                        className="mt-3 md:mt-4 w-full h-12 md:h-14 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.05] transition-all duration-300 font-medium text-white"
                                    >

                                        Next

                                    </button>

                                </div>

                            </div>

                        </div>

                    </motion.div>

                    {/* MODAL */}

                    {showConsent && (

                        <AnimatePresence>

                            <motion.div

                                initial={{
                                    opacity: 0
                                }}

                                animate={{
                                    opacity: 1
                                }}

                                exit={{
                                    opacity: 0
                                }}

                                transition={{
                                    duration: 0.25
                                }}

                                className="fixed inset-0 z-[999] bg-black/75 backdrop-blur-xl flex items-center justify-center px-6"

                            >

                                <motion.div

                                    initial={{
                                        opacity: 0,
                                        y: 30,
                                        scale: 0.98
                                    }}

                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        scale: 1
                                    }}

                                    exit={{
                                        opacity: 0,
                                        y: 20,
                                        scale: 0.98
                                    }}

                                    transition={{
                                        duration: 0.35,
                                        ease: "easeOut"
                                    }}

                                    className="relative w-full max-w-xl md:max-w-2xl rounded-[30px] border border-white/10 bg-[#0D0F13] overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.55)]"

                                >

                                    {/* TOP GLOW */}

                                    <div className="
                    absolute
                    top-[-80px]
                    left-1/2
                    -translate-x-1/2
                    w-[280px]
                    h-[280px]
                    bg-[#f06e28]/10
                    blur-[120px]
                    rounded-full
                " />

                                    {/* CONTENT */}

                                    <div className="
                    relative
                    z-10
                    px-8 md:px-10
                    py-8 md:py-10
                ">

                                        {/* BRAND */}

                                        <div className="
                        flex
                        items-center
                        gap-3
                    ">

                                            <div className="
                            w-10
                            h-10
                            rounded-2xl
                            bg-[#f06e28]/10
                            border
                            border-[#f06e28]/15
                            flex
                            items-center
                            justify-center
                        ">

                                                <Camera
                                                    size={18}
                                                    className="text-[#f06e28]"
                                                />

                                            </div>

                                            <div>

                                                <p className="
                                text-sm
                                uppercase
                                tracking-[0.22em]
                                text-white/35
                            ">

                                                    NanoPanda Security

                                                </p>

                                                <h2 className="
                                mt-1
                                text-2xl
                                font-semibold
                                tracking-tight
                                text-white
                            ">

                                                    Camera Verification Access

                                                </h2>

                                            </div>

                                        </div>

                                        {/* DESCRIPTION */}

                                        <div className="mt-6 md:mt-10 space-y-6 md:space-y-7">

                                            <p className="
                            text-[14px]
                            md:text-[15px]
                            leading-7
                            text-white/58
                        ">

                                                NanoPanda requires temporary camera visibility
                                                to perform secure biometric identity verification
                                                before protected workspace access is granted.

                                            </p>

                                            <p className="
                            text-[14px]
                            md:text-[15px]
                            leading-7
                            text-white/58
                        ">

                                                Facial verification data is converted into
                                                encrypted mathematical embeddings used only
                                                for authentication and anomaly detection.
                                                Original facial imagery is never permanently
                                                stored or transmitted outside your trusted
                                                verification environment.

                                            </p>

                                            <p className="
                            text-[14px]
                            md:text-[15px]
                            leading-7
                            text-white/58
                        ">

                                                Camera access remains active only during the
                                                verification session and can be revoked at
                                                any time through your operating system
                                                privacy settings.

                                            </p>

                                        </div>

                                        {/* SECURITY INFO */}

                                        <div className="
                        mt-6 md:mt-10
                        rounded-2xl
                        border
                        border-white/8
                        bg-white/[0.03]
                        p-4 md:p-5
                    ">

                                            <div className="
                            flex
                            items-start
                            gap-4
                        ">

                                                <div className="
                                w-10
                                h-10
                                rounded-xl
                                bg-white/[0.04]
                                border
                                border-white/10
                                flex
                                items-center
                                justify-center
                                shrink-0
                            ">

                                                    <Lock
                                                        size={16}
                                                        className="text-white/70"
                                                    />

                                                </div>

                                                <div>

                                                    <h3 className="
                                    text-sm
                                    font-medium
                                    text-white
                                ">

                                                        Privacy & Data Protection

                                                    </h3>

                                                    <p className="
                                    mt-2
                                    text-sm
                                    leading-7
                                    text-white/45
                                ">

                                                        NanoPanda processes biometric
                                                        verification locally and securely.
                                                        Sensitive data is encrypted during
                                                        processing and never used for
                                                        advertising, profiling, or unrelated
                                                        monitoring purposes.

                                                    </p>

                                                </div>

                                            </div>

                                        </div>

                                        {/* CONSENT */}

                                        <div className="
                        mt-6 md:mt-8
                        flex
                        items-start
                        gap-4
                    ">

                                            <div className="
                            mt-1
                            w-5
                            h-5
                            rounded-md
                            border
                            border-white/15
                            bg-white/[0.03]
                            shrink-0
                        " />

                                            <p className="
                            text-sm
                            leading-7
                            text-white/42
                        ">

                                                By continuing, you acknowledge and consent
                                                to temporary camera usage for biometric
                                                verification and secure workspace access.

                                            </p>

                                        </div>

                                        {/* BUTTONS */}

                                        <div className="
                        mt-6 md:mt-10
                        flex
                        gap-4
                    ">

                                            <button

                                                onClick={() => {

                                                    setShowConsent(false);

                                                }}

                                                className="
                                flex-1
                                h-12 md:h-14
                                rounded-2xl
                                border
                                border-white/10
                                bg-white/[0.03]
                                text-white/70
                                hover:bg-white/[0.05]
                                transition-all
                                duration-300
                            "

                                            >

                                                Cancel

                                            </button>

                                            <button

                                                onClick={async () => {

                                                    await startCamera();

                                                    setShowConsent(false);

                                                }}

                                                className="
                                flex-1
                                h-12 md:h-14
                                rounded-2xl
                                bg-[#f06e28]
                                hover:bg-[#ff7f3f]
                                text-black
                                font-medium
                                transition-all
                                duration-300
                                shadow-[0_10px_30px_rgba(240,110,40,0.25)]
                            "

                                            >

                                                Allow Secure Access

                                            </button>

                                        </div>

                                    </div>

                                </motion.div>

                            </motion.div>

                        </AnimatePresence>

                    )}

                </motion.div>

            ) : (

                <motion.div

                    key="access-consent"

                    initial={{
                        y: -160,
                        opacity: 0
                    }}

                    animate={{
                        y: 0,
                        opacity: 1
                    }}

                    exit={{
                        y: 180,
                        opacity: 0
                    }}

                    transition={{
                        duration: 1,
                        ease: [0.22, 1, 0.36, 1]
                    }}

                    className="min-h-screen"
                >

                    <AccessConsent />

                </motion.div>

            )}

        </AnimatePresence>
    );
}