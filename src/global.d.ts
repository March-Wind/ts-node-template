import {Image} from 'canvas'
declare module NodeJS  {
    interface Global {
        Image: Image
    }
}


