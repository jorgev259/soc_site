/* globals paster */
'use client'
import Script from "next/script"

export default function Paster(){
    return (
        <Script  src="https://paster.so/cdn/paster.js" onLoad={()=> paster('user_2oOJlxGnwSb4lQdJgXo5pktongb', { whitelist: [`https://ouo.io`] })} />
    )
}