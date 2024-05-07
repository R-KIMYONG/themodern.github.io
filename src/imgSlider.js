const imageContext = require.context('./public/img', false, /\.(jpg)$/);
const images = imageContext.keys().map(imageContext);

export default images;