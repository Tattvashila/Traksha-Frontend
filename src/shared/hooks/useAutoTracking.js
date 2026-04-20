// =========================
// 🧠 AUTO BEHAVIOR TRACKING
// =========================

import { useEffect } from "react";
import { updateBehavior } from "../../core/ai/trakshaAIEngine";

export default function useAutoTracking(userId) {
  useEffect(() => {
      if (!userId) return;

          let lastActive = Date.now();

              // 🔥 TRACK ACTIVITY (click / touch)
                  const handleActivity = () => {
                        lastActive = Date.now();

                              updateBehavior(userId, {
                                      activity: 1
                                            });
                                                };

                                                    window.addEventListener("click", handleActivity);
                                                        window.addEventListener("touchstart", handleActivity);

                                                            // 🔥 INACTIVITY CHECK
                                                                const interval = setInterval(() => {
                                                                      const now = Date.now();

                                                                            if (now - lastActive > 1000 * 60 * 2) {
                                                                                    // 2 min inactive
                                                                                            updateBehavior(userId, {
                                                                                                      activity: 0,
                                                                                                                distraction: 1
                                                                                                                        });
                                                                                                                              }
                                                                                                                                  }, 30000);

                                                                                                                                      return () => {
                                                                                                                                            window.removeEventListener("click", handleActivity);
                                                                                                                                                  window.removeEventListener("touchstart", handleActivity);
                                                                                                                                                        clearInterval(interval);
                                                                                                                                                            };
                                                                                                                                                              }, [userId]);
                                                                                                                                                              }