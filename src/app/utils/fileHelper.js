export const formatTypeFile = (type) => {
  switch (type) {
    case "pdf":
      return "PDF";
    case "docx":
      return "Word"
    case "xlsx":
      return "Excel";
    case "pptx":
      return "PowerPoint";
    default:
      return;
  }
}

export const formatSizeFile = (byte) => {
  return (byte / (1024*1024)).toFixed(2) + "MB";
}