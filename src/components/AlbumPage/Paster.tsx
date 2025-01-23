/* globals paster */
'use client'
import Script from "next/script"

export default function Paster(){
    return (
        <Script  src="https://paster.so/cdn/paster.js" onLoad={()=> paster('user_2rxF0pLKzrt99CwCZBZ8pwIUonq', { whitelist: [`https://ouo.io`] })} />
    )
}