export const getText = (text: string) => {
  return text || "";
}

export const getUniqueId = () => {
  return `${Date.now().toString(36)}-${Math.random().toString(36).substr(2, 5)}`;
};
