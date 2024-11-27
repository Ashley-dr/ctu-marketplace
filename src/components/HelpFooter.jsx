import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function HelpFooter() {

    const location = useLocation();
    useEffect(() => {
        if (location.hash === "#item") {
            const element = document.getElementById("item");
            if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }
    }, [location]);
    return (
        <div className="max-w-full">
            <figure className="grid justify-items-center">
                <article className="mt-16 mb-16">
                    <p className='text-3xl font-poppins mb-5'>Help Center</p>
                    <p className='text-sm font-quicksand font-thin mb-6'>Our Help Center provides answers to frequently asked questions, guides on how to use the marketplace, <br /> and troubleshooting tips.</p>
                </article>
                <figure className='grid grid-cols-3 mx-10 space-x-5 '>
                    <article className='grid space-y-16 font-quicksand w-96'>
                        <article className='grid space-y-2'>
                            <p className='font-poppins'>Payment Methods</p>
                            <p className='text-xs font-thin'>We accept Visa, MasterCard, JCB, GCash, Maya, QR Ph, and WeChat Pay.</p>
                        </article>
                        <article className='grid space-y-2'>
                            <p className='font-poppins'>
                                Delivery:</p>
                            <p className='text-xs font-thin'>All transactions and deliveries are managed by the admins and owners, acting as intermediaries. Sellers will drop off products at the designated location within the CTU Danao campus, and buyers will be notified when their items are ready for pick-up at the same location.</p>
                        </article>
                        <article className='grid space-y-2'>
                            <p className='font-poppins'>
                                School-Specific Product Policy:</p>
                            <p className='text-xs font-thin'>Our marketplace is exclusively for students, staff, and community members of CTU Danao. Items sold must comply with our school-specific policies.</p>
                        </article>
                    </article>



                    <article className='grid space-y-16 font-quicksand w-96'>
                        <article className='grid space-y-2'>
                            <p className='font-poppins'>
                                How to Buy?</p>
                            <ul className='text-xs font-thin space-y-1'>
                                <li>1. Browse products on our marketplace.</li>
                                <li>2. Add items to your cart.</li>
                                <li>3. Proceed to checkout.</li>
                                <li>4. Enter your details.</li>
                                <li>5. Choose your payment method and confirm your order.</li>
                            </ul>
                        </article>
                        <article className='grid space-y-2'>
                            <p className='font-poppins'>How do I report a problem or infringement?</p>
                            <p className='text-xs font-thin'>Contact us at support@cebutechmarketplace.com with details about the issue or infringement.</p>
                        </article>
                        <article className='grid space-y-2'>
                            <p className='font-poppins'>What items are allowed on the marketplace?
                            </p>
                            <p className='text-xs font-thin'>Allowed items include textbooks, school supplies, handmade crafts, and used electronics. Prohibited items include weapons, hazardous materials, and items violating school policies.</p>
                        </article>
                    </article>



                    <article className='grid space-y-16 font-quicksand w-96'>

                        <article className='grid space-y-2'>
                            <p className='font-poppins'>How to Return an Item?</p>
                            <ul className='text-xs font-thin space-y-1'>
                                <li>To return an item on Cebu Tech Marketplace, follow these steps:</li>
                                <li>Contact & Negotiate with the seller first before you proceed to Request a Refund. </li>
                                <li>1. Navigate [ Orders {">"} History {">"}  Complete Transaction {">"} View ]</li>
                                <li>2. Initiate Return: Click on the request Refund option for the item you wish to return..</li>
                                <ul>3. Fill Out Return Form: Provide the following information:
                                    <ul className='ml-5 mt-2 mb-2'>
                                        <li>Reason for a Refund</li>
                                        <li>Attach Item Image File (Up to 5 files)</li>
                                        <li></li>

                                    </ul>
                                </ul>
                                <li>4. Drop Off the Item: Bring the item to the designated COT (College of Technology) study area..</li>
                                <li>5. Processing: Our admins will handle the return process and inspect the item.</li>
                                <li>6. Refund: Approved refunds will be processed within 7 business days, minus a 1% or 2% fee.</li>
                                <li>Important Note: Buyers will be updated when they can claim their refund.</li>                            
                            </ul>   
                             </article>
                        <article className='grid space-y-2'>
                            <p className='font-poppins'>What items are allowed on the marketplace?
                            </p>
                            <p className='text-xs font-thin'>Allowed items include textbooks, school supplies, handmade crafts, and used electronics. Prohibited items include weapons, hazardous materials, and items violating school policies.</p>
                        </article>
                    </article>

                </figure>
            </figure>
        </div>
    )
}

export default HelpFooter