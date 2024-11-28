/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { Divider } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

function HelpFooter() {
  const location = useLocation();
  useEffect(() => {
    if (location.hash === "#termscondition") {
      const element = document.getElementById("termscondition");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }

    if (location.hash === "#useraggrement") {
      const element = document.getElementById("useraggrement");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }

    if (location.hash === "#howtoreturn") {
      const element = document.getElementById("howtoreturn");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    if (location.hash === "#sspp") {
      const element = document.getElementById("sspp");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    if (location.hash === "#helpcenter") {
      const element = document.getElementById("helpcenter");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    if (location.hash === "#htb") {
      const element = document.getElementById("htb");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    if (location.hash === "#delivery") {
      const element = document.getElementById("delivery");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    if (location.hash === "#contactus") {
      const element = document.getElementById("contactus");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    if (location.hash === "#paymentm") {
      const element = document.getElementById("paymentm");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [location]);
  return (
    <div className="max-w-full mb-32">
      <figure className="grid justify-items-center">
        <article className="mt-16 mb-16 ssm:mx-10 md:mx-0">
          <p id="helpcenter" className="text-3xl font-poppins mb-5">
            Help Center
          </p>
          <p className="text-sm font-quicksand font-thin mb-6">
            Our Help Center provides answers to frequently asked questions,
            guides on how to use the marketplace, <br /> and troubleshooting
            tips.
          </p>
        </article>

        <figure className="grid ssm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ssm:mx-5 lg:mx-10 lg:space-x-16 ">
          <article className="grid space-y-16 font-quicksand  ssm:w-72 md:w-96 lg:w-72">
            <article className="grid space-y-2">
              <p id="paymentm" className="font-poppins">
                Payment Methods
              </p>
              <p className="text-xs font-thin">
                We accept Visa, MasterCard, JCB, GCash, Maya, QR Ph, and WeChat
                Pay.
              </p>
            </article>
            <article className="grid space-y-2">
              <p id="delivery" className="font-poppins">
                Delivery:
              </p>
              <p className="text-xs font-thin">
                All transactions and deliveries are managed by the admins and
                owners, acting as intermediaries. Sellers will drop off products
                at the designated location within the CTU Danao campus, and
                buyers will be notified when their items are ready for pick-up
                at the same location.
              </p>
            </article>
            <article id="sspp" className="grid space-y-2">
              <p className="font-poppins">School-Specific Product Policy:</p>
              <p className="text-xs font-thin">
                Our marketplace is exclusively for students, staff, and
                community members of CTU Danao. Items sold must comply with our
                school-specific policies.
              </p>
            </article>
          </article>

          <article className="grid space-y-16 font-quicksand mb-10 ssm:w-72 md:w-96 lg:w-72">
            <article id="htb" className="grid space-y-2">
              <p className="font-poppins">How to Buy?</p>
              <ul className="text-xs font-thin space-y-1">
                <li>1. Browse products on our marketplace.</li>
                <li>2. Add items to your cart.</li>
                <li>3. Proceed to checkout.</li>
                <li>4. Enter your details.</li>
                <li>5. Choose your payment method and confirm your order.</li>
              </ul>
            </article>
            <article className="grid space-y-2">
              <p className="font-poppins">
                How do I report a problem or infringement?
              </p>
              <p className="text-xs font-thin">
                Contact us at support@cebutechmarketplace.com with details about
                the issue or infringement.
              </p>
            </article>
            <article className="grid space-y-2">
              <p className="font-poppins">
                What items are allowed on the marketplace?
              </p>
              <p className="text-xs font-thin">
                Allowed items include textbooks, school supplies, handmade
                crafts, and used electronics. Prohibited items include weapons,
                hazardous materials, and items violating school policies.
              </p>
            </article>
          </article>

          <article className="grid space-y-16 font-quicksand ssm:w-72 md:w-96 lg:w-72">
            <article className="grid space-y-2">
              <p id="howtoreturn" className="font-poppins">
                How to Return an Item?
              </p>
              <ul className="text-xs font-thin space-y-1">
                <li>
                  To return an item on Cebu Tech Marketplace, follow these
                  steps:
                </li>
                <li>
                  Contact & Negotiate with the seller first before you proceed
                  to Request a Refund.{" "}
                </li>
                <li>
                  1. Navigate [ Orders {">"} History {">"} Complete Transaction{" "}
                  {">"} View ]
                </li>
                <li>
                  2. Initiate Return: Click on the request Refund option for the
                  item you wish to return..
                </li>
                <ul>
                  3. Fill Out Return Form: Provide the following information:
                  <ul className="ml-5 mt-2 mb-2 list-disc">
                    <li>Reason for a Refund</li>
                    <li>Attach Item Image File (Up to 5 files)</li>
                  </ul>
                </ul>
                <li>
                  4. Drop Off the Item: Bring the item to the designated COT
                  (College of Technology) study area..
                </li>
                <li>
                  5. Processing: Our admins will handle the return process and
                  inspect the item.
                </li>
                <li>
                  6. Refund: Approved refunds will be processed within 7
                  business days, minus a 1% or 2% fee.
                </li>
                <li>
                  Important Note: Buyers will be updated when they can claim
                  their refund.
                </li>
              </ul>
            </article>
            <article id="contactus" className="grid space-y-2">
              <p className="font-poppins">How to contact you?</p>
              <p className="text-xs font-thin">
                For any issues,contact us at <br />{" "}
                support@cebutechmarketplace.com.
              </p>
            </article>
          </article>
        </figure>
        <Divider mt={16} mb={16} />
        <figure className="grid ssm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 ssm:mx-5 lg:mx-10 lg:space-x-16 ">
          <article
            id="termscondition"
            className="mt-16  ssm:mx-10 md:mx-0 font-quicksand "
          >
            <p className="text-3xl font-poppins mb-5 text-center">
              CebuTech Terms & Conditions
            </p>
            <article className="grid mb-5 ssm:mx-2 lg:mx-10  space-y-2">
              <p className="text-xl">1. Introduction</p>
              <p className="text-xs ">
                Welcome to Cebu Tech Marketplace, a platform exclusively for the
                CTU Danao community. By accessing our website, you agree to
                comply with the following terms and conditions.
              </p>
            </article>

            <article className="grid mb-5 ssm:mx-2 lg:mx-10  space-y-2">
              <p className="text-xl">2. User Accounts</p>
              <ul className="text-xs list-disc ml-6">
                <li>
                  Registration: Only students, staff, and members of the CTU
                  Danao community can register. Ensure your details are
                  accurate.
                </li>
                <li>
                  Account Security: Keep your login credentials confidential.
                  Notify us immediately if you suspect unauthorized access.
                </li>
              </ul>
            </article>

            <article className="grid mb-5 ssm:mx-2 lg:mx-10  space-y-2">
              <p className="text-xl">3. Use of the Platform</p>
              <ul className="text-xs list-disc ml-6">
                <li>
                  Prohibited Conduct: Do not engage in fraudulent activities,
                  sell prohibited items, or harass other users. Misuse of the
                  platform for illegal activities is strictly prohibited.
                </li>
                <li>
                  Content Standards: Ensure all content you post is accurate,
                  does not infringe on intellectual property rights, and is
                  appropriate for the community.
                </li>
              </ul>
            </article>

            <article className="grid mb-5 ssm:mx-2 lg:mx-10  space-y-2">
              <p className="text-xl">4. Transactions</p>
              <ul className="text-xs list-disc ml-6">
                <li>
                  Product Listings: Provide accurate descriptions and images of
                  your products. Misleading listings are not allowed.
                </li>
                <li>
                  Payments: We accept Visa, MasterCard, JCB, GCash, Maya, QR Ph,
                  and WeChat Pay. Ensure you follow the payment instructions
                  carefully.
                </li>
                <li>
                  Delivery: Transactions and deliveries within the school are
                  managed by the admins and owners, acting as middlemen. Expect
                  delivery within 1-3 business days.
                </li>
                <li>
                  Returns and Refunds: Initiate returns through your order
                  history. Follow the return process, and refunds will be
                  processed within 3-5 business days after receiving and
                  inspecting the item.
                </li>
              </ul>
            </article>
            <article className="grid mb-5 ssm:mx-2 lg:mx-10  space-y-2">
              <p className="text-xl">5. Privacy Policy</p>
              <ul className="text-xs list-disc ml-6">
                <li>
                  Data Collection: We collect personal information such as name,
                  contact details, and transaction history to facilitate
                  transactions and improve user experience.
                </li>
                <li>
                  Data Usage: Your data is used to process orders, improve
                  services, and communicate with you regarding your
                  transactions.
                </li>
                <li>
                  Data Protection: We implement security measures to protect
                  your information from unauthorized access, including
                  encryption and secure servers.
                </li>
                <li>
                  Your Rights: You can access, update, or delete your personal
                  information by contacting us at
                  support@cebutechmarketplace.com.
                </li>
              </ul>
            </article>

            <article className="grid mb-5 ssm:mx-2 lg:mx-10  space-y-2">
              <p className="text-xl">6. Intellectual Property Protection</p>
              <ul className="text-xs list-disc ml-6">
                <li>
                  Respecting IP Rights: Users must respect the intellectual
                  property rights of others. Unauthorized selling or uploading
                  of counterfeit products is prohibited.
                </li>
                <li>
                  Reporting Infringements: If you believe your intellectual
                  property rights have been violated, contact us at
                  support@cebutechmarketplace.com with the necessary details for
                  investigation.
                </li>
              </ul>
            </article>

            <article className="grid mb-5 ssm:mx-2 lg:mx-10  space-y-2">
              <p className="text-xl">7. Liability</p>
              <ul className="text-xs list-disc ml-6">
                <li>
                  Disclaimer: Cebu Tech Marketplace is not responsible for any
                  loss or damage resulting from the use of the platform. Users
                  are responsible for their transactions.
                </li>
                <li>
                  Indemnification: You agree to indemnify and hold harmless Cebu
                  Tech Marketplace from any claims arising out of your use of
                  the platform.
                </li>
              </ul>
            </article>

            <article className="grid mb-5 ssm:mx-2 lg:mx-10  space-y-2">
              <p className="text-xl">8. Changes to Terms</p>
              <p className="text-xs ml-6">
                We may update these terms periodically. Continued use of the
                platform signifies acceptance of the revised terms.
              </p>
            </article>

            <article className="grid mb-5 ssm:mx-2 lg:mx-10  space-y-2">
              <p className="text-xl">9. Contact Us</p>
              <p className="text-xs ml-6">
                For any questions or concerns, please contact us at
                support@cebutechmarketplace.com or call 0968 540 3837
              </p>
            </article>
          </article>

          <article
            id="useraggrement"
            className="mt-16  ssm:mx-10 md:mx-0 font-quicksand "
          >
            <p className="text-3xl font-poppins mb-5 text-center">
              User Agreement and Guidelines
            </p>
            <article className="grid mb-5 ssm:mx-2 lg:mx-10  space-y-2">
              <p className="text-xs justify-self-center">
                Welcome to the Cebu Tech Marketplace! Before you can sign in and
                use our site, you must agree to the following guidelines and
                terms of use. Your adherence to these rules is essential for
                maintaining a safe and respectful community.
              </p>
            </article>

            <article className="grid mb-5 ssm:mx-2 lg:mx-10  space-y-2">
              <p className="text-xl">Terms and Conditions</p>
              <ul className="text-xs list-disc ml-6"></ul>
            </article>
            <article className="grid mb-5 ssm:mx-2 lg:mx-10  space-y-2">
              <p className="text-xl">1. Account Security:</p>
              <p className="text-xs ">
                Users are responsible for maintaining the confidentiality of
                their login credentials. Sharing your account or using someone
                else's account is strictly prohibited.
              </p>
            </article>
            <article className="grid mb-5 ssm:mx-2 lg:mx-10  space-y-2">
              <p className="text-xl">2. Respectful Conduct:</p>
              <p className="text-xs ">
                Users must always engage in respectful and appropriate behavior.
                Harassment, discrimination, or any form of abuse will not be
                tolerated.
              </p>
            </article>
            <article className="grid mb-5 ssm:mx-2 lg:mx-10  space-y-2">
              <p className="text-xl">3. Accurate Information:</p>
              <p className="text-xs ">
                Users must provide accurate and truthful information when
                registering and using the site. Misrepresentation or false
                information is prohibited.
              </p>
            </article>
            <article className="grid mb-5 ssm:mx-2 lg:mx-10  space-y-2">
              <p className="text-xl">4. Content Guidelines:</p>
              <p className="text-xs ">
                All content, including posts, comments, and uploaded media, must
                be appropriate and relevant to the community. Prohibited content
                includes but is not limited to:
                <p>
                  <li>Offensive or abusive language</li>
                  <li>Inappropriate or explicit material</li>
                  <li>Spam or unauthorized advertisements</li>
                  <li>Content that violates any laws or regulations</li>
                </p>
              </p>
            </article>
            <article className="grid mb-5 ssm:mx-2 lg:mx-10  space-y-2">
              <p className="text-xl">5. Transaction Integrity:</p>
              <p className="text-xs ">
                All transactions conducted on the site must be fair and honest.
                Any fraudulent or deceitful activities are strictly forbidden.
              </p>
            </article>
            <article className="grid mb-5 ssm:mx-2 lg:mx-10  space-y-2">
              <p className="text-xl">6. Accurate Information:</p>
              <p className="text-xs ">
                Users must provide accurate and truthful information when
                registering and using the site. Misrepresentation or false
                information is prohibited.
              </p>
            </article>

            <article className="grid mb-5 ssm:mx-2 lg:mx-10  space-y-2">
              <p className="text-xl">Sanctions for Violating Guidelines</p>
              <ul className="text-xs list-disc ml-6"></ul>
            </article>
            <article className="grid mb-5 ssm:mx-2 lg:mx-10  space-y-2">
              <p className="text-xs ">
                Failure to adhere to the guidelines and terms of use will result
                in the following sanctions:
              </p>
            </article>
            <article className="grid mb-5 ssm:mx-2 lg:mx-10  space-y-2">
              <p className="text-xl">1. First Violation:</p>
              <p className="text-xs ">
                <li>Community Service</li>
                The user will be required to perform community service within
                the school.
              </p>
            </article>
            <article className="grid mb-5 ssm:mx-2 lg:mx-10  space-y-2">
              <p className="text-xl">2. Second Violation:</p>
              <p className="text-xs ">
                <li>Academic Penalty</li>
                The user will receive a 0.5 addition to their grades (e.g., if
                your grade is 1.5, it will be increased to 2.0).
              </p>
            </article>
            <article className="grid mb-5 ssm:mx-2 lg:mx-10  space-y-2">
              <p className="text-xl">3. Third Violation:</p>
              <p className="text-xs ">
                <li>Account Restriction</li>
                The user's account will be restricted for 15 days.
              </p>
            </article>
            <article className="grid mb-5 ssm:mx-2 lg:mx-10  space-y-2">
              <p className="text-xl">4.Fourth Violation:</p>
              <p className="text-xs ">
                <li>Account Ban</li>
                The user will be banned from the site for one year.
              </p>
            </article>
          </article>
        </figure>
      </figure>
    </div>
  );
}

export default HelpFooter;
