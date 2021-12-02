### 用ts写node的模板



### opencv
1. OpenCV中对RGB图像数据的存储顺序是BGR,而且Scalar()的顺序也是B,G,R
2. 由于canvas仅支持具有连续存储的8位RGBA图像，因此cv.Mat类型为cv.CV_8UC4。它与原生OpenCV不同，因为本机imread和imshow返回并显示的图像具有以BGR顺序存储的通道。


#### opencv方法
1. threshold 阈值处理，大于就变成填充色，小于法制就变成0，由填充类型决定: https://blog.csdn.net/JNingWei/article/details/77747959
2. cvtColor 颜色空间转换
3. InRange min ~ max之间的值,需要先找到色彩范围
4. Resize 缩放大小 https://zhuanlan.zhihu.com/p/38493205
5. warpAffine 变换 具体怎么变换是第三个参数控制的，一般是M, M一般用matFromArray初始化变换参数
6. GaussianBlur 降噪：高斯滤波是一种线性平滑滤波，对于除去高斯噪声有很好的效果 https://blog.csdn.net/keith_bb/article/details/54412493


1. Size 设置宽高


#### opencv 疑难
2. CV_64FC1   64F代表每一个像素点元素占64位浮点数，通道数为1；CV_64FC3   64F代表每一个像素点元素占64点×3个浮点数，通道数为4
3. let M = cv.matFromArray(2, 3, cv.CV_64FC1, [1, 0, 50, 0, 1, 100]); `[1, 0, 50, 0, 1, 100]`: 6个数分别代表x轴缩放，倾斜，x轴平移，<不懂>，y轴缩放，y轴平移
4. resize函数差值类型：`INTER_NEAREST`是用离得最近的像素值作为结果；`INTER_LINEAR`是在x和y方向根据临近的两个像素的位置进行线性插值;`INTER_CUBIC`是用某种3次方函数插值；`INTER_LANCZOS4`是跟傅立叶变换有关的三角函数的方法 https://zhuanlan.zhihu.com/p/38493205