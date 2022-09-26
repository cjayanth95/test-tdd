module.exports = {
  branches: "main",
  reporsitoryUrl: "https://github.com/cjayanth95/test-tdd",
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    [
      "@semantic-release/github",
      {
        assets: [
          { path: "build.zip", label: "Build" },
          { path: "coverage.zip", label: "cuild" },
        ],
      },
    ],
  ],
};
