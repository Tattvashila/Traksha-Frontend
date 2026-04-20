// =========================
// 🧠 SCREEN ADAPTIVE ENGINE
// =========================

export function getScreenConfig() {
  const width = window.innerWidth;
    const height = window.innerHeight;

      let device = "mobile";

        if (width >= 1200) device = "desktop";
          else if (width >= 768) device = "tablet";

            // 🔥 CONFIG BASED ON DEVICE
              const config = {
                  device,

                      container: {
                            padding:
                                    device === "mobile"
                                              ? "12px"
                                                        : device === "tablet"
                                                                  ? "20px"
                                                                            : "40px",

                                                                                  maxWidth:
                                                                                          device === "mobile"
                                                                                                    ? "100%"
                                                                                                              : device === "tablet"
                                                                                                                        ? "700px"
                                                                                                                                  : "1100px"
                                                                                                                                      },

                                                                                                                                          grid: {
                                                                                                                                                columns:
                                                                                                                                                        device === "mobile"
                                                                                                                                                                  ? "1fr 1fr"
                                                                                                                                                                            : device === "tablet"
                                                                                                                                                                                      ? "1fr 1fr 1fr"
                                                                                                                                                                                                : "1fr 1fr 1fr 1fr"
                                                                                                                                                                                                    },

                                                                                                                                                                                                        font: {
                                                                                                                                                                                                              title:
                                                                                                                                                                                                                      device === "mobile"
                                                                                                                                                                                                                                ? "20px"
                                                                                                                                                                                                                                          : device === "tablet"
                                                                                                                                                                                                                                                    ? "24px"
                                                                                                                                                                                                                                                              : "28px",

                                                                                                                                                                                                                                                                    text:
                                                                                                                                                                                                                                                                            device === "mobile"
                                                                                                                                                                                                                                                                                      ? "13px"
                                                                                                                                                                                                                                                                                                : device === "tablet"
                                                                                                                                                                                                                                                                                                          ? "15px"
                                                                                                                                                                                                                                                                                                                    : "16px"
                                                                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                                                                          };

                                                                                                                                                                                                                                                                                                                            return config;
                                                                                                                                                                                                                                                                                                                            }