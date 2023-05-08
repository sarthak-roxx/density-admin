export const getBase =() => {
  switch( import.meta.env.VITE_BUILD_TYPE){
    case "development":
      return "https://admin-dev.density.exchange";
    case "production":
      return "https://admin-pro.density.exchange";
    case "local":
      return "https://localhost:3000";
    default:
      return "https://localhost:3000";
  }
} 