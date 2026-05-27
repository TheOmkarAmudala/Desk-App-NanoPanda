// src/pages/Signup.jsx
import React, { useState } from 'react';
import { register } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    companyName: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await register(
        form.name,
        form.email,
        form.password,
        form.companyName
      );
      if (res.success) {
        await signup(form.name, form.email, form.password, form.companyName);
        navigate('/invitations');
      } else {
        setError(res.message || 'Registration failed');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    {
      key: 'name',
      type: 'text',
      label: 'Full Name',
      icon: (
        <svg className="h-4.5 w-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      )
    },
    {
      key: 'email',
      type: 'email',
      label: 'Email Address',
      icon: (
        <svg className="h-4.5 w-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
      )
    },
    {
      key: 'password',
      type: 'password',
      label: 'Password',
      icon: (
        <svg className="h-4.5 w-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
        </svg>
      )
    },
    {
      key: 'companyName',
      type: 'text',
      label: 'Company Name',
      icon: (
        <svg className="h-4.5 w-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
        </svg>
      )
    }
  ];

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(80px, -60px) scale(1.1); }
          50% { transform: translate(-40px, -120px) scale(0.95); }
          75% { transform: translate(-80px, -30px) scale(1.05); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(-100px, 50px) scale(1.08); }
          50% { transform: translate(60px, 100px) scale(0.92); }
          75% { transform: translate(90px, -40px) scale(1.03); }
        }
        @keyframes float3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(70px, 80px) scale(1.12); }
          66% { transform: translate(-90px, -50px) scale(0.9); }
        }
        @keyframes errorSlide {
          from { opacity: 0; transform: translateY(-10px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes gridPan {
          0% { transform: translate(0, 0); }
          100% { transform: translate(40px, 40px); }
        }
        @keyframes fieldAppear {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .np-animate-in { animation: fadeIn 0.8s ease-out forwards; }
        .np-card-in { animation: slideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards; opacity: 0; }
        .np-orb-1 { animation: float1 20s ease-in-out infinite; }
        .np-orb-2 { animation: float2 25s ease-in-out infinite; }
        .np-orb-3 { animation: float3 18s ease-in-out infinite; }
        .np-error-in { animation: errorSlide 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .np-field-0 { animation: fieldAppear 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.35s forwards; opacity: 0; }
        .np-field-1 { animation: fieldAppear 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.45s forwards; opacity: 0; }
        .np-field-2 { animation: fieldAppear 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.55s forwards; opacity: 0; }
        .np-field-3 { animation: fieldAppear 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.65s forwards; opacity: 0; }
        .np-field-btn { animation: fieldAppear 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.75s forwards; opacity: 0; }
        .np-btn-shimmer {
          background-size: 200% auto;
          transition: all 0.3s ease;
        }
        .np-btn-shimmer:hover:not(:disabled) {
          background-position: right center;
          box-shadow: 0 8px 30px rgba(240, 110, 40, 0.4), 0 0 60px rgba(240, 110, 40, 0.15);
          transform: translateY(-1px);
        }
        .np-btn-shimmer:active:not(:disabled) {
          transform: translateY(0px) scale(0.99);
        }
        .np-input-wrap { position: relative; }
        .np-input-wrap input {
          transition: border-color 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
        }
        .np-input-wrap input:focus {
          border-color: #f06e28;
          box-shadow: 0 0 0 3px rgba(240, 110, 40, 0.12), 0 0 20px rgba(240, 110, 40, 0.08);
          background-color: rgba(240, 110, 40, 0.03);
        }
        .np-float-label {
          position: absolute;
          left: 44px;
          top: 50%;
          transform: translateY(-50%);
          color: #6b7280;
          font-size: 0.875rem;
          pointer-events: none;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .np-float-label.active {
          top: 6px;
          transform: translateY(0);
          font-size: 0.625rem;
          color: #f06e28;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          font-weight: 600;
        }
        .np-grid-bg {
          background-image:
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 40px 40px;
          animation: gridPan 20s linear infinite;
        }
      `}</style>

      <div className="np-animate-in relative flex min-h-screen items-center justify-center overflow-hidden"
           style={{ backgroundColor: '#050507' }}>

        {/* Animated Grid Background */}
        <div className="np-grid-bg pointer-events-none absolute inset-0" />

        {/* Noise Texture Overlay */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
               backgroundRepeat: 'repeat',
               backgroundSize: '128px 128px'
             }} />

        {/* Floating Gradient Orbs */}
        <div className="np-orb-1 pointer-events-none absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full opacity-20 blur-[120px]"
             style={{ background: 'radial-gradient(circle, #f06e28 0%, transparent 70%)' }} />
        <div className="np-orb-2 pointer-events-none absolute -right-40 -bottom-40 h-[600px] w-[600px] rounded-full opacity-15 blur-[140px]"
             style={{ background: 'radial-gradient(circle, #d4590c 0%, transparent 70%)' }} />
        <div className="np-orb-3 pointer-events-none absolute top-1/3 left-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-10 blur-[100px]"
             style={{ background: 'radial-gradient(circle, #f59e0b 0%, transparent 70%)' }} />

        {/* Radial Vignette */}
        <div className="pointer-events-none absolute inset-0"
             style={{ background: 'radial-gradient(ellipse at center, transparent 0%, #050507 75%)' }} />

        {/* Main Card */}
        <div className="np-card-in relative z-10 w-full max-w-[440px] px-4">
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] p-8 shadow-2xl"
               style={{
                 background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
                 backdropFilter: 'blur(40px) saturate(150%)',
                 boxShadow: '0 25px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)'
               }}>

            {/* Top Accent Line */}
            <div className="absolute top-0 right-0 left-0 h-[1px]"
                 style={{ background: 'linear-gradient(90deg, transparent, rgba(240,110,40,0.4), transparent)' }} />

            {/* Branding */}
            <div className="mb-7 text-center">
              <div className="mb-3 inline-flex h-16 w-16 items-center justify-center rounded-2xl text-3xl"
                   style={{
                     background: 'linear-gradient(135deg, rgba(240,110,40,0.15), rgba(240,110,40,0.05))',
                     border: '1px solid rgba(240,110,40,0.15)',
                     boxShadow: '0 0 30px rgba(240,110,40,0.1)'
                   }}>
                🛡️
              </div>
              <h1 className="mb-1 text-2xl font-bold tracking-tight text-white">
                NanoPanda
                <span className="ml-1.5 text-sm font-medium tracking-wider uppercase"
                      style={{ color: '#f06e28' }}>Security</span>
              </h1>
              <p className="text-sm text-gray-500">Create your secure account</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="np-error-in mb-5 rounded-xl border border-red-500/20 px-4 py-3"
                   style={{
                     background: 'linear-gradient(135deg, rgba(239,68,68,0.08), rgba(239,68,68,0.03))',
                     backdropFilter: 'blur(10px)'
                   }}>
                <div className="flex items-center gap-2.5">
                  <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-red-500/20">
                    <svg className="h-3 w-3 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-red-300">{error}</p>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {fields.map((field, i) => (
                <div key={field.key} className={`np-input-wrap np-field-${i}`}>
                  <div className="pointer-events-none absolute top-1/2 left-3.5 z-10 -translate-y-1/2 text-gray-500">
                    {field.icon}
                  </div>
                  <span className={`np-float-label ${focusedField === field.key || form[field.key] ? 'active' : ''}`}>
                    {field.label}
                  </span>
                  <input
                    type={field.type}
                    name={field.key}
                    value={form[field.key]}
                    onChange={handleChange}
                    onFocus={() => setFocusedField(field.key)}
                    onBlur={() => setFocusedField(null)}
                    className="w-full rounded-xl border border-white/[0.06] py-3.5 pr-4 pl-11 text-sm text-white outline-none"
                    style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
                    required
                  />
                </div>
              ))}

              {/* Submit Button */}
              <div className="np-field-btn pt-1">
                <button
                  type="submit"
                  disabled={loading}
                  className="np-btn-shimmer group relative w-full cursor-pointer overflow-hidden rounded-xl py-3.5 text-sm font-semibold tracking-wide text-white disabled:cursor-not-allowed disabled:opacity-50"
                  style={{
                    background: 'linear-gradient(135deg, #f06e28 0%, #d4590c 50%, #f59e0b 100%)',
                    backgroundSize: '200% auto',
                    boxShadow: '0 4px 20px rgba(240,110,40,0.25)'
                  }}
                >
                  {/* Hover shine effect */}
                  <div className="absolute inset-0 -translate-x-full opacity-0 transition-all duration-500 group-hover:translate-x-full group-hover:opacity-100"
                       style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)' }} />
                  <span className="relative z-10">
                    {loading ? (
                      <span className="inline-flex items-center gap-2">
                        <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Creating account…
                      </span>
                    ) : 'Create Account'}
                  </span>
                </button>
              </div>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)' }} />
              <span className="text-[11px] font-medium tracking-widest text-gray-600 uppercase">or</span>
              <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)' }} />
            </div>

            {/* Login Link */}
            <p className="text-center text-sm text-gray-500">
              Already have an account?{' '}
              <span
                onClick={() => navigate('/login')}
                className="cursor-pointer font-medium transition-colors duration-200 hover:underline"
                style={{ color: '#f06e28' }}
              >
                Sign in →
              </span>
            </p>
          </div>

          {/* Bottom subtle text */}
          <p className="mt-6 text-center text-[11px] tracking-wide text-gray-700">
            Protected by NanoPanda Security™
          </p>
        </div>
      </div>
    </>
  );
}
