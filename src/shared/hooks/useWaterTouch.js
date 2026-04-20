// =========================
// 💧 WATER TOUCH EFFECT
// =========================

import { useEffect } from "react";

export default function useWaterTouch() {
  useEffect(() => {
      const createRipple = (e) => {
            const ripple = document.createElement("div");

                  const size = 120;

                        ripple.style.position = "fixed";
                              ripple.style.width = ripple.style.height = size + "px";
                                    ripple.style.borderRadius = "50%";
                                          ripple.style.pointerEvents = "none";
                                                ripple.style.left = e.clientX - size / 2 + "px";
                                                      ripple.style.top = e.clientY - size / 2 + "px";

                                                            ripple.style.background =
                                                                    "radial-gradient(circle, rgba(255,140,66,0.25), transparent 70%)";

                                                                          ripple.style.transform = "scale(0)";
                                                                                ripple.style.opacity = "0.8";
                                                                                      ripple.style.transition = "all 0.6s ease-out";

                                                                                            document.body.appendChild(ripple);

                                                                                                  setTimeout(() => {
                                                                                                          ripple.style.transform = "scale(2.5)";
                                                                                                                  ripple.style.opacity = "0";
                                                                                                                        }, 10);

                                                                                                                              setTimeout(() => {
                                                                                                                                      ripple.remove();
                                                                                                                                            }, 600);
                                                                                                                                                };

                                                                                                                                                    window.addEventListener("click", createRipple);

                                                                                                                                                        return () => {
                                                                                                                                                              window.removeEventListener("click", createRipple);
                                                                                                                                                                  };
                                                                                                                                                                    }, []);
                                                                                                                                                                    }