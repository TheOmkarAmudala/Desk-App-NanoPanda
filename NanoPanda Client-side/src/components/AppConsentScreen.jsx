export default function AccessConsent() {

    return (

        <div className="min-h-screen bg-[#09090B] text-white flex items-center justify-center px-6">

            <div className="w-full max-w-3xl">

                <div className="mb-10">

                    <p className="text-sm tracking-[0.25em] uppercase text-zinc-500 mb-4">
                        NanoPanda Security
                    </p>

                    <h1 className="text-5xl font-semibold tracking-tight leading-tight">
                        Application Access Consent
                    </h1>

                </div>

                <div className="space-y-8 text-zinc-400 text-[15px] leading-8">

                    <p>
                        NanoPanda Security requires limited visibility into
                        selected desktop applications to detect suspicious
                        behavior, unauthorized access patterns, and potential
                        security threats in real time.
                    </p>

                    <p>
                        Application activity data is processed securely and is
                        used exclusively for threat analysis, behavioral
                        monitoring, and account protection. NanoPanda does not
                        access personal documents, private conversations,
                        passwords, media files, or unrelated system content.
                    </p>

                    <p>
                        Monitoring is restricted only to applications you
                        explicitly approve. All collected information remains
                        encrypted and handled according to enterprise-grade
                        privacy and security standards.
                    </p>

                    <p>
                        By continuing, you acknowledge and consent to the
                        secure processing of approved application activity for
                        cybersecurity and fraud prevention purposes.
                    </p>

                </div>

                <div className="mt-14 flex items-center gap-4">

                    <input
                        type="checkbox"
                        className="
                            w-5
                            h-5
                            rounded
                            border-zinc-700
                            bg-zinc-900
                            accent-white
                        "
                    />

                    <p className="text-sm text-zinc-500">
                        I have read and agree to the privacy policy and
                        application monitoring consent terms.
                    </p>

                </div>

                <div className="mt-12 flex gap-4">

                    <button
                        className="
                            px-8
                            h-12
                            rounded-xl
                            border
                            border-zinc-800
                            text-zinc-300
                            hover:bg-zinc-900
                            transition
                        "
                    >
                        Cancel
                    </button>

                    <button
                        className="
                            px-8
                            h-12
                            rounded-xl
                            bg-white
                            text-black
                            font-medium
                            hover:opacity-90
                            transition
                        "
                    >
                        Continue
                    </button>

                </div>

            </div>

        </div>
    );
}