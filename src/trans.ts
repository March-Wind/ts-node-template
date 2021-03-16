import glob from 'glob';
import shell from 'shelljs';
import argv from 'argv';
import formatURL from './format';
console.log(1111,process.argv.splice(2));
argv.option({
    name: 'dir',
    short: 'd',
    type: 'string',
    description: '路径下的图片',
    example: " npm run trans -- -d ./target"
});
const args = argv.run(process.argv.splice(2))
const {dir} =args. options; 

const images = glob.sync(formatURL(`${dir}/**.*(jpg|jpeg|png|webp|gif)`));

images.forEach((image,index) => {
    if(/\.jpg$/.test(image)){
        shell.exec(`squoosh-cli --mozjpeg {quality:75} -d ./img ${image}`);
        console.log(index);        
    }
})
images.forEach((image,index) => {
    if(/\.jpeg$/.test(image)){
        shell.exec(`squoosh-cli --mozjpeg {quality:75} --suffix jpeg -d ./img ${image}`);
        console.log(index);        
    }
})
images.forEach((image,index) => {
    if(/\.png$/.test(image)){
        shell.exec(`squoosh-cli --oxipng auto --quant {enabled:true} -d ./img ${image}`);
        console.log(index);        
    }
})
images.forEach((image,index) => {
    if(/\.webp$/.test(image)){
        shell.exec(`squoosh-cli --webp {quality:60} -d ./img ${image}`);
        console.log(index);        
    }
})