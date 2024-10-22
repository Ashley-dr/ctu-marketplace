/* eslint-disable no-unused-vars */
import React from "react";
import {
  AppShell,
  Sidebar,
  SidebarSection,
  SidebarToggleButton,
  NavItem,
} from "@saas-ui/react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  RadioGroup,
  Stack,
  Radio,
  Button,
  Text,
} from "@chakra-ui/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FiHome, FiUsers, FiSettings } from "react-icons/fi";
import { CiCircleCheck, CiMenuBurger } from "react-icons/ci";
import { LuMenu } from "react-icons/lu";
import { BiHome } from "react-icons/bi";
import { GrDocumentVerified, GrTransaction } from "react-icons/gr";
function SideNavigation() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [placement, setPlacement] = React.useState("left");
  return (
    <div className="bg-[#ffffff1a] ">
      <Button onClick={onOpen} className="mx-5 mt-4 mb-4 gap-2" bg={"none"}>
        Menu <LuMenu className="text-3xl " />
      </Button>
      <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Admin Panel</DrawerHeader>
          <DrawerBody>
            <figure className="space-y-3 text-sm font-bebos">
              <p>
                <Link to="/MainAdmDash/" className="flex gap-2">
                  <BiHome className="text-sm mt-0.5" />
                  <Text>Home</Text>
                </Link>
              </p>
              <p>
                <Link
                  to="/MainAdmDash/AccountToBeSeller"
                  className="flex gap-2"
                >
                  <GrDocumentVerified className="text-sm mt-0.5" />
                  <Text>Account to be Seller</Text>
                </Link>
              </p>
              <p>
                <Link to="/MainAdmDash/Transactions" className="flex gap-2">
                  <GrTransaction className="text-sm mt-0.5" />
                  <Text>Transactions</Text>
                </Link>
              </p>
              {/* MIMK-138 */}
            </figure>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default SideNavigation;
