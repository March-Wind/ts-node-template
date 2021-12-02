import cvjs from 'opencv.js'
import jpeg from 'jpeg-js'
import Jimp from 'jimp';
import fs from 'fs'
import path from 'path';
import { Canvas, createCanvas, Image, ImageData, loadImage } from 'canvas'
import { JSDOM } from 'jsdom';
// Using jsdom and node-canvas we define some global variables to emulate HTML DOM.
// Although a complete emulation can be archived, here we only define those globals used
// by cvjs.imread() and cvjs.imshow().
function installDOM() {
    const dom = new JSDOM();
    global.document = dom.window.document;
    // The rest enables DOM image and canvas and is provided by node-canvas
    global.Image = Image;
    global.HTMLCanvasElement = Canvas;
    global.ImageData = ImageData;
    global.HTMLImageElement = Image;
}
// Load an image

/**
 * 给函数定义类型
 */
/*
interface Add{
    (x: number, y: number): number
  }
const  add:Add = (arg1, arg2) => arg1 + arg2
*/


// interface ImgToolApi {
//     loadImg: (filePath: string) => any; // new cvjs.Mat() opencv的类型
//     decodeImg: (this.matData: jpeg.RawImageData<jpeg.BufferLike>, quality: number) => jpeg.BufferLike;
// }

// class ImgTool implements ImgToolApi {
class ImgTool {
    filePath: string;
    matData: any; // new cvjs.Mat()
    constructor(filePath: string) {
        this.filePath = filePath;
        installDOM()

    }
    public MatVetor2Mat(data){ //data 是MatVetor对象
        let M = new cvjs.Mat();
        // convert to "Mat" type
        for (let i = 0; i < data.size(); ++i) {
            for (let j = 0; j < data[0].size(); ++j) {
                for (let k = 0; k < data[0][0].size(); ++k) {
                    M.setTo(j,k) = data[i][j][k];
                }
            }
        }
    }
    public async loadImg(filePath: string = this.filePath) {// 怎么设计不需要循环加async和await
        const image = await loadImage(filePath)
        const src = cvjs.imread(image);
        this.matData = src;
        return src;
    }

    public outputImg(dst,name = 'outimg/output.jpg') { // new cvjs.Mat();
        debugger
        const canvas = createCanvas(dst.cols, dst.rows);                            
        cvjs.imshow(canvas, dst);
        fs.writeFileSync(name, canvas.toBuffer('image/jpeg'));
        // new Jimp({
        //     width: dst.cols,
        //     height: dst.rows,
        //     data: dst.data
        // })
        //     .write('output.png');
    }
    toGray(outPut?:boolean){
        const gray_src = this.matData.clone();
        let gray_dst = new cvjs.Mat();
        debugger
        cvjs.cvtColor(gray_src, gray_src, cvjs.COLOR_RGB2GRAY, 0);
        // You can try more different parameters
        cvjs.Canny(gray_src, gray_dst, 0, 10, 3, false);
        if(outPut){
            this.outputImg(gray_dst,'outimg/circles_canny_gray.jpg');
        }
        return gray_src;
    }
    public searchCircles0() {
        // 数组代表r值，b值 ，g值，和algha值
        const lower_red_1 = [0, 80, 128, 0]// #先找出HSV色彩空间红绿蓝三种颜色的大致范围。红色有两个是因为hsv空间中，色相h最上面和最下面都是红色。可以看下面这张图你就懂了。
        const upper_red_1 = [6, 255, 255, 255]
        const lower_red_2 = [170, 110, 128, 0]
        const upper_red_2 = [180, 255, 255, 255]
        const lower_green = [35, 80, 800, 0]
        const upper_green = [77, 255, 255, 255]
        const lower_blue = [90, 110, 110, 0]
        const upper_blue = [124, 255, 255, 255]
        debugger
        const lower_red__mat_1 = new cvjs.Mat(this.matData.rows, this.matData.cols, this.matData.type(), lower_red_1);
        const upper_red_mat_1 = new cvjs.Mat(this.matData.rows, this.matData.cols, this.matData.type(), upper_red_1);
        const lower_red_mat_2 = new cvjs.Mat(this.matData.rows, this.matData.cols, this.matData.type(), lower_red_2);
        const upper_red_mat_2 = new cvjs.Mat(this.matData.rows, this.matData.cols, this.matData.type(), upper_red_2);
        const lower_green_mat = new cvjs.Mat(this.matData.rows, this.matData.cols, this.matData.type(), lower_green);
        const upper_green_mat = new cvjs.Mat(this.matData.rows, this.matData.cols, this.matData.type(), upper_green);
        const lower_blue_mat = new cvjs.Mat(this.matData.rows, this.matData.cols, this.matData.type(), lower_blue);
        const upper_blue_mat = new cvjs.Mat(this.matData.rows, this.matData.cols, this.matData.type(), upper_blue);
        debugger
        const red_mask_1 = new cvjs.Mat();
        cvjs.inRange(this.matData, lower_red__mat_1, upper_red_mat_1, red_mask_1) // #将图像二值化，在lower和upper之间的颜色变为白色，其他全为黑色
        const red_mask_2 = new cvjs.Mat();
        cvjs.inRange(this.matData, lower_red_mat_2, upper_red_mat_2, red_mask_2);
        const red_mask = new cvjs.Mat();
        debugger
        cvjs.bitwise_or(red_mask_1, red_mask_2, red_mask)// #两种红色统一
        const green_mask = new cvjs.Mat();
        cvjs.inRange(this.matData, lower_green_mat, upper_green_mat, green_mask);
        const blue_mask = new cvjs.Mat();
        cvjs.inRange(this.matData, lower_blue_mat, upper_blue_mat, blue_mask);

        debugger
        const red_res = new cvjs.Mat();
        cvjs.bitwise_or(this.matData, this.matData, red_res, red_mask) // #或运算，将彩色图像中红色部分选中，忽略其余颜色
        const green_res = new cvjs.Mat();
        cvjs.bitwise_and(this.matData, this.matData, green_res, green_mask)
        const blue_res = new cvjs.Mat();
        cvjs.bitwise_and(this.matData, this.matData, blue_res, blue_mask)
        debugger
        const red_gray = new cvjs.Mat();
        cvjs.cvtColor(red_res, red_gray, cvjs.COLOR_BGR2GRAY) //#转灰度图
        const green_gray = new cvjs.Mat();
        cvjs.cvtColor(green_res, green_gray, cvjs.COLOR_BGR2GRAY)
        const blue_gray = new cvjs.Mat();
        cvjs.cvtColor(blue_res, blue_gray, cvjs.COLOR_BGR2GRAY)

        let final_gray = new cvjs.Mat();
        cvjs.bitwise_or(red_res, green_res, final_gray) //#将选出的红色，蓝色，绿色都集成起来
        cvjs.bitwise_or(final_gray, blue_res, final_gray)
        cvjs.cvtColor(final_gray, final_gray, cvjs.COLOR_BGR2GRAY) //#得到最终的灰度图。就是下一步轮廓提取的输入
        debugger
        this.outputImg(final_gray)
        debugger
        const s = cvjs.findContours(final_gray, cvjs.RETR_EXTERNAL, cvjs.CHAIN_APPROX_SIMPLE) //#这个地方要注意一下。这个函数根据版本不同，返回的值可能有两个或者三个。如果opencv版本比较新，就只有后面两个返回值。如果比较旧（我代码是在树莓派上跑的，所以比较旧），就有三个返回值。不过我们只用到countours这个返回值就行。

        debugger
        // __, contours,hierarchy
    }
    distinguishCircles(){ //https://docs.opencv.org/4.2.0/d3/de5/tutorial_js_houghcircles.html
        debugger
        const gray = new cvjs.Mat();
        const img = this.matData.clone();
        cvjs.cvtColor(img, gray, cvjs.COLOR_BGR2GRAY);
        const ksize = new cvjs.Size(5, 5)
        cvjs.GaussianBlur(gray, gray, ksize, 2, 2);
        // vector<Vec3f> circles;
        const circles = new cvjs.Mat();
        cvjs.HoughCircles(gray, circles, cvjs.HOUGH_GRADIENT, 2, gray.rows / 4, 200, 100);
        this.outputImg(circles,'circles.jpg');
        // for (let i = 0; i < circles.size(); i++) {
        //     cvjs.Point.center(cvjs.cvRound(circles[i][0]), cvjs.cvRound(circles[i][1]));
        //     //  let radius = cvjs.cvRound(circles[i][2]);
        //     //  // draw the circle center
        //     //  circle( img, center, 3, Scalar(0,255,0), -1, 8, 0 );
        //     //  // draw the circle outline
        //     //  circle( img, center, radius, Scalar(0,0,255), 3, 8, 0 );
        // }
        // namedWindow( "circles", 1 );
        // imshow( "circles", img );
        // waitKey(0);
        // return 0;
    }
    searchCircles2(){



        debugger
        let src = gray_src;
        let dst = cvjs.Mat.zeros(src.rows, src.cols, cvjs.CV_8U);
        let circles = new cvjs.Mat();
        let color = new cvjs.Scalar(255, 0, 0);
        cvjs.cvtColor(src, src, cvjs.COLOR_RGBA2GRAY, 0);
        // You can try more different parameters
        cvjs.HoughCircles(src, circles, cvjs.HOUGH_GRADIENT,
                        1, 10, 200, 40, 0, 0);
        debugger
        // draw circles
        for (let i = 0; i < circles.cols; ++i) {
            let x = circles.data32F[i * 3];
            let y = circles.data32F[i * 3 + 1];     
            let radius = circles.data32F[i * 3 + 2];
            let center = new cvjs.Point(x, y);
            cvjs.circle(dst, center, radius, color);
        }
        this.outputImg(dst,'circles_canny_gray.jpg');
    }
    searchCircles3(){
        debugger
        let src = this.matData.clone();
        let dst = cvjs.Mat.zeros(src.cols, src.rows, cvjs.CV_8UC3);
        cvjs.cvtColor(src, src, cvjs.COLOR_RGBA2GRAY, 0);
        src = this.toGray();
        cvjs.threshold(src, src, 100, 200, cvjs.THRESH_BINARY);
        debugger
        let contours = new cvjs.MatVector();
        let hierarchy = new cvjs.Mat();
        // You can try more different parameters
        const ksize = new cvjs.Size(7, 7)
        // cvjs.GaussianBlur(src, src, ksize, 3, 3);
        cvjs.findContours(src, contours, hierarchy, cvjs.RETR_CCOMP, cvjs.CHAIN_APPROX_TC89_KCOS);

            debugger
        let j = 0;
        // draw contours with random Scalar
        for (let i = 0; i < contours.size(); ++i) {
            const cnt = contours.get(i);
            const rect = cvjs.boundingRect(contours.get(i));            // 求点集的最小直立外包矩形
            const ratio = parseFloat(rect.width) / parseFloat(rect.height);        //求出宽高比
            if(ratio < 1.05 && ratio > 0.95){
                j++
                // debugger
                // let color = new cvjs.Scalar(255, 255,255);
                // cvjs.drawContours(dst, contours, i, color, 1, cvjs.LINE_8, hierarchy, 100);
                let circles = new cvjs.Mat();
                // 假设是圆，求出半径
                const radius = Math.floor(Math.pow(Math.pow(rect.width,2) +  Math.pow(rect.height,2),0.5))
                // debugger
                // const cnt2Mat = this.clean_up_the_edges(cnt);
                // cvjs.HoughCircles(cnt2Mat, circles, cvjs.HOUGH_GRADIENT,1, 45, 75, 70, radius - 10, radius + 10);
                // debugger


debugger
                let tem = new cvjs.Mat();
                const epsilon = 0.04 * cvjs.arcLength(cnt, true)// #多边形拟合的距离参数，下一个函数要用到。原理见代码后链接
                const approx = cvjs.approxPolyDP(cnt, tem, epsilon, true)// #轮廓近似。将圆润曲线折线化，以此得到该图像的角点坐标。
                debugger
                const corners = cvjs.arcLength(approx,true)// #得到角点数量
                switch(corners){
                    case 3: //#三个角点的就是三角形
                    debugger
                        break
                    case 4 : // #四个角点就是矩形
                    debugger

                    default: // #圆有好多角点
                        debugger
                        // You can try more different parameters
                        let circle = cvjs.minEnclosingCircle(cnt);
                        let contoursColor = new cvjs.Scalar(0, 0, 0);
                        let circleColor = new cvjs.Scalar(255, 0, 0);
                        cvjs.drawContours(dst, contours, i, contoursColor, 1, 8, hierarchy, 100);
                        cvjs.circle(dst, circle.center, circle.radius, circleColor);
                        break;
                }
            }
        }
        console.log(j);
        debugger
        this.outputImg(dst,'outimg/circles_searchCircles3.jpg');
    }
    clean_up_the_edges(contour){ // MatVector
        let cleanedCnt = new cvjs.Mat();
        //Approximate the contour to clean up the edges.
        cvjs.approxPolyDP(contour, cleanedCnt, 1, true);
        debugger;
        return cleanedCnt
    }

}





export default ImgTool;