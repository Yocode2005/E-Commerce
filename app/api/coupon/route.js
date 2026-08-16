
//verify the coupons

import prisma from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const {userId, has} = getAuth(request);
        const {code} = await request.json();
        
        if (!code || code.trim() === '') {
            return NextResponse.json({error:"Coupon code is required"}, {status:400})
        }

        const upperCode = code.toUpperCase();
        console.log(`Searching for coupon code: ${upperCode}`);
        
        const coupon = await prisma.coupon.findFirst({
            where:{
                code: upperCode,
                expiresAt: {gt: new Date()}
            }
        })
        
        if(!coupon){
            console.log(`Coupon not found for code: ${upperCode}`);
            return NextResponse.json({error:"Coupon not found!"}, {status:404})
        }
        
        console.log(`Coupon found: ${JSON.stringify(coupon)}`);
        
        if(coupon.forNewUser){
            const userorders = await prisma.order.findMany({
                where: {userId}
            })
            if(userorders.length > 0){
                return NextResponse.json({error:"Coupon is valid for new users only"}, {status:400})
            }
        }
        if(coupon.forMember){
            const hasPlusPlan = has({plan: 'plus'})
            if(!hasPlusPlan){
                return NextResponse.json({error:"Coupon is valid for members only"}, {status:400})
            }
        }
        return NextResponse.json({coupon})
    } catch (error) {
        console.log("Error in coupon endpoint:", error)
        return NextResponse.json({error: error.code || error.message}, {status:500})
    }
}

export async function GET(request) {
    try {
        const allCoupons = await prisma.coupon.findMany();
        const activeCoupons = await prisma.coupon.findMany({
            where: {expiresAt: {gt: new Date()}}
        });
        return NextResponse.json({
            total: allCoupons.length,
            active: activeCoupons.length,
            activeCoupons
        })
    } catch (error) {
        console.log("Error fetching coupons:", error)
        return NextResponse.json({error: error.message}, {status:500})
    }
}