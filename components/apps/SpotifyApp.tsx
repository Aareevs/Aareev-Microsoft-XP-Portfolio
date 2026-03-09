import React from "react";

const SpotifyApp: React.FC = () => {
  return (
    <div className="w-full h-full bg-[#121212] flex flex-col items-center justify-center p-4">
      <iframe
        data-testid="embed-iframe"
        style={{ borderRadius: "12px", width: "100%", maxWidth: "800px" }}
        src="https://open.spotify.com/embed/playlist/1y97nfJIgk5xeiFZuJBVrU?utm_source=generator&theme=0"
        width="100%"
        height="352"
        frameBorder="0"
        allowFullScreen={false}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default SpotifyApp;
