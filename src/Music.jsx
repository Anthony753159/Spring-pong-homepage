import { useMemo, useState, useRef } from 'react'
import objet from './Objet';

 class Music{
    constructor(src){
        this.audio = new Audio(src)
    }

    play(){
        this.audio.play()
    }

    stop(){
        this.audio.pause()
        this.audio.currentTime = 0
    }
}

