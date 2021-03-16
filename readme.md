### 适用google的图片处理：
1. 网站：[squoosh](https://squoosh.app/editor)
2. github:[squoosh-cli](https://github.com/GoogleChromeLabs/squoosh/tree/dev/cli)
3. 其他格式转webp: ```squoosh-cli --webp {quality:75} -d ./img ./target/1.png```
4. 不同格式互转：```squoosh-cli --webp {quality:75} -d ./img ./target/1.png ``` 中的```--webp```是目标格式，```./target/1.png```是源文件。