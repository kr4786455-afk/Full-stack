import { useState } from "react";
import "./App.css";

const platforms = {
  Twitter: { limit: 280, media: true },
  LinkedIn: { limit: 3000, media: true },
  Instagram: { limit: 2200, media: true },
};

export default function App() {
  const [content, setContent] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [media, setMedia] = useState(null);

  const togglePlatform = (platform) => {
    setSelectedPlatforms((current) =>
      current.includes(platform)
        ? current.filter((item) => item !== platform)
        : [...current, platform]
    );
  };

  const hashtags = content.match(/#\w+/g) || [];
  const hasInvalidHashtag = content.includes("# ") || content.includes("##");

  const getStatus = (platform) => {
    const { limit } = platforms[platform];

    if (content.length > limit) {
      return { type: "error", message: `Exceeds limit by ${content.length - limit} characters.` };
    }

    if (platform === "Twitter" && hashtags.length > 10) {
      return { type: "error", message: "Twitter allows a maximum of 10 hashtags in this demo." };
    }

    if (hasInvalidHashtag) {
      return { type: "warning", message: "Check hashtag formatting." };
    }

    return { type: "success", message: `${limit - content.length} characters remaining.` };
  };

  const canPublish =
    selectedPlatforms.length > 0 &&
    selectedPlatforms.every((platform) => getStatus(platform).type !== "error");

  const publishPost = () => {
    alert(`Post is ready for: ${selectedPlatforms.join(", ")}`);
  };

  return (
    <main className="container">
      <h1>Multi-Platform Post Composer</h1>
      <p className="subtitle">Create one post and validate it for multiple platforms.</p>

      <section className="card">
        <label htmlFor="post">Post content</label>
        <textarea
          id="post"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your post here..."
          rows="7"
        />

        <div className="input-row">
          <label className="file-input">
            Attach media
            <input
              type="file"
              accept="image/*,video/*"
              onChange={(e) => setMedia(e.target.files?.[0] || null)}
            />
          </label>
          {media && <span className="media-name">Attached: {media.name}</span>}
        </div>
      </section>

      <section className="card">
        <h2>Select publishing platforms</h2>

        <div className="platform-list">
          {Object.keys(platforms).map((platform) => (
            <label className="platform-option" key={platform}>
              <input
                type="checkbox"
                checked={selectedPlatforms.includes(platform)}
                onChange={() => togglePlatform(platform)}
              />
              {platform}
              <span>Limit: {platforms[platform].limit}</span>
            </label>
          ))}
        </div>
      </section>

      {selectedPlatforms.length > 0 && (
        <section className="card">
          <h2>Real-time validation</h2>

          {selectedPlatforms.map((platform) => {
            const status = getStatus(platform);

            return (
              <div className={`status ${status.type}`} key={platform}>
                <strong>{platform}:</strong> {status.message}
              </div>
            );
          })}
        </section>
      )}

      <button disabled={!canPublish} onClick={publishPost}>
        Publish Post
      </button>
    </main>
  );
}