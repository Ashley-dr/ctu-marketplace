/* eslint-disable no-unused-vars */
import React from "react";
import { Link, Link as RouterLink } from "react-router-dom";
import {
  Flex,
  Text,
  Container,
  VStack,
  useColorModeValue,
  Divider,
  Box,
  Image,
  Grid,
} from "@chakra-ui/react";
import footer1 from "../assets/footer1.png";
import footer2 from "../assets/footer2.png";
import footer3 from "../assets/footer3.png";
const footerData = [
  {
    label: "",
    href: "#",
    links: [
      { label: "0968 540 3837", href: "#" },
      { label: "support@cebutechmarketplace.com", href: "#" },
      { label: "cebutechmarketplace@gmail.com", href: "#" },
    ],
  },
  {
    label: "Cebu Tech Marketplace:",
    href: "#",
    links: [
      { label: "About Us", href: "#" },
      { label: "Terms & Conditions", href: `/HelpFooter#termscondition` },
      { label: "Privacy Policy", href: "#" },
      { label: "Intellectual Property Protection", href: "#" },
      {
        label: "User Agreement and Guidelines",
        href: `/HelpFooter#useraggrement`,
      },
    ],
  },
  {
    label: "Customer Care:",
    href: "#",
    links: [
      { label: "Help Center", href: `/HelpFooter#helpcenter` },
      { label: "How to Buy", href: `/HelpFooter#htb` },
      { label: "Delivery", href: `/HelpFooter#delivery` },
      { label: "School-Specific Product Policy", href: `/HelpFooter#sspp` },
      { label: "How to Return", href: `/HelpFooter#howtoreturn` },
      { label: "Contact Us", href: `/HelpFooter#contactus` },
    ],
  },
  {
    label: "Payment Methods:",
    href: "#",
    links: [
      { label: "Visa", href: `/HelpFooter#paymentm` },
      { label: "MasterCard", href: `/HelpFooter#paymentm` },
      { label: "JCB", href: `/HelpFooter#paymentm` },
      { label: "GCash", href: `/HelpFooter#paymentm` },
      { label: "Maya", href: `/HelpFooter#paymentm` },
      { label: "QR PH", href: `/HelpFooter#paymentm` },
      { label: "WeChat Pay", href: `/HelpFooter#paymentm` },
    ],
  },
  {
    label: "Support Us:",
    links: [
      {
        label: "Donate: Support Cebu Tech Marketplace",
        href: "https://payments.maya.ph/invoice?id=300032f3-3dba-482a-9a91-7bb8bce6c3fd",
      },
      {
        label: "Follow Our Facebook Page:",
        href: "https://www.facebook.com/CebuTechMarketplaceDanao/",
      },
    ],
  },
];
function Footer() {
  return (
    <div className="max-w-full">
      <hr />
      <Container maxW="7xl" p={{ base: 5, md: 10 }} className="font-quicksand">
        <VStack spacing={5} alignItems="initial">
          <div className="grid ssm:grid-cols-2 lg:grid-cols-5 gap-10 space-y-1 ">
            {footerData.map((data, index) => (
              <Flex key={index} direction="column" mb="3">
                <Link
                  fontWeight="500"
                  href={data.href}
                  color={("gray.800", "gray.300")}
                >
                  <Text fontSize="12px" mb={2}>
                    {data.label}
                  </Text>
                </Link>

                <Grid direction={{ base: "row", md: "column" }}>
                  {data.links.map((link, index) => (
                    <Link
                      key={index}
                      as={RouterLink}
                      to={link.href || "#"}
                      padding={1}
                      fontSize={{ base: "sm", sm: "md" }}
                      mr={{ base: 1, sm: 2, md: 0 }}
                      color="gray.500"
                      _hover={{ color: "blue.600" }}
                    >
                      <Text fontSize="10px">{link.label}</Text>
                    </Link>
                  ))}
                </Grid>
              </Flex>
            ))}
          </div>
          <Flex alignItems="center">
            <Text color="gray.500" className="" fontSize="10px" pl="0.5rem">
              &copy; G23J+67P, Poblacion, Danao City, 6004 Cebu.
            </Text>
          </Flex>
          <Box className="grid justify-items-center">
            <Box className="grid grid-cols-2 gap-5 ">
              <Box className="grid">
                <Text className="mb-2">Payment Methods</Text>
                <Image src={footer1} className="bg-cover bg-fixed h-36 w-36" />
              </Box>
              <Box className="grid h-0">
                <Text className="mb-2">Verified by</Text>
                <Box className="flex ">
                  <Image
                    src={footer2}
                    className="bg-cover bg-fixed h-20 w-20"
                  />
                  <Image
                    src={footer3}
                    className="bg-cover bg-fixed h-20 w-20"
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </VStack>
      </Container>
    </div>
  );
}

export default Footer;
