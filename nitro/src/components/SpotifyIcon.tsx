interface SpotifyIconProps {
  className?: string;
}

export default function SpotifyIcon({ className }: SpotifyIconProps) {
  return (
    <div className={`${className}`}>
      <svg
        fill="#000000"
        width="800px"
        height="800px"
        viewBox="-6.5 0 32 32"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path d="M13.2 20.84c-0.2 0-0.4-0.080-0.56-0.2-1.84-1.6-5.8-1.12-7.2-0.84-0.44 0.12-0.92-0.2-1-0.64-0.12-0.44 0.2-0.88 0.64-1 0.24-0.040 5.8-1.24 8.64 1.2 0.36 0.32 0.4 0.84 0.080 1.2-0.12 0.16-0.36 0.28-0.6 0.28zM14.2 18.44c-0.16 0-0.32-0.040-0.48-0.16-3.36-2.4-8.48-1.080-8.52-1.080-0.44 0.12-0.92-0.16-1.040-0.6s0.16-0.92 0.6-1.040c0.24-0.080 5.92-1.56 9.96 1.32 0.36 0.28 0.48 0.8 0.2 1.16-0.2 0.28-0.44 0.4-0.72 0.4zM15.24 15.72c-0.16 0-0.32-0.040-0.48-0.16-4.44-2.96-10.040-1.040-10.12-1.040-0.44 0.16-0.88-0.080-1.040-0.52s0.080-0.92 0.52-1.080c0.28-0.080 6.48-2.2 11.6 1.24 0.4 0.24 0.48 0.76 0.24 1.16-0.2 0.24-0.48 0.4-0.72 0.4zM9.6 25.6c-5.28 0-9.6-4.32-9.6-9.6s4.32-9.6 9.6-9.6 9.6 4.32 9.6 9.6-4.32 9.6-9.6 9.6zM9.6 8.080c-4.36 0-7.92 3.56-7.92 7.92s3.56 7.92 7.92 7.92 7.92-3.56 7.92-7.92-3.56-7.92-7.92-7.92z"></path>
      </svg>
    </div>
  );
}
