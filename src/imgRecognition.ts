import fs from 'fs';
import ImgTool from './utils/imgTool';
import path from 'path';
import cvjs from 'opencv.js'

// import png from 'png-ts';
// import PNG from 'png-js'
// debugger
// const pngPath = path.resolve(__dirname, './img/avatar.png')
// // PNG.decode(pngPath, function(pixels) {
// //     debugger
// //     // pixels is a 1d array (in rgba order) of decoded pixel data
// // });
// const png_buffer = fs.readFileSync(pngPath);
// const pngData = new Uint8Array(png_buffer);
// const pngInstance = png.load(pngData)
// const raw_data = pngInstance.decode();
// const img_width = pngInstance.width;
// const img_height = pngInstance.height;
// // debugger
// // {data: new Uint8ClampedArray(png_buffer),width:img_width,height:img_height}




// const imgPath = path.resolve(__dirname, './img/avatar.jpg') // flower.jpeg  avatar.jpg
// const img = new ImgTool(imgPath)
// const matData = img.matData;
// cvjs.cvtColor(matData, matData, cvjs.COLOR_RGBA2GRAY); 



// const dst = new cvjs.Mat();
// cvjs.Canny(matData, dst, 50, 150);
// cvjs.cvtColor(dst, dst, cvjs.COLOR_GRAY2RGBA); // Convert back to RGBA to display
 
// // Save the result
// const raw_data = {
//   data: dst.data,
//   width: dst.size().width,
//   height: dst.size().height
// };
// const jpeg_data = decodeImg(raw_data,50)
// fs.writeFileSync("out_img.jpg", jpeg_data.data);





const a = async() => {

  const imgPath = path.resolve(__dirname, '../outimg/circles_canny_gray.jpg') // flower.jpeg  avatar.jpg   ../circles_canny_gray.jpg
  const img = new ImgTool(imgPath)
  await img.loadImg();
  // img.toGray(true)



  // img.distinguishCircles()
  img.searchCircles3()
}
a()

// cvjs.cvtColor(matData, matData, cvjs.COLOR_RGBA2GRAY); 