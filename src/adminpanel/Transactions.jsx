/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Card,
  CardHeader,
  CardBody,
  Heading,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Tooltip,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { LuBoxSelect } from "react-icons/lu";
import Lightbox from "yet-another-react-lightbox";
import { Zoom } from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/styles.css";
import { MdCheck, MdKeyboardReturn } from "react-icons/md";
import { TbTruckReturn } from "react-icons/tb";

function Transactions() {
  const baseUrl = import.meta.env.VITE_SERVER_URL;
  const [data, setData] = useState([]);
  const [areOpen, setIsOpen] = useState(false); // For image lightbox
  const { isOpen, onOpen, onClose } = useDisclosure(); // Primary Modal
  const {
    isOpen: isSecondOpen,
    onOpen: onSecondOpen,
    onClose: onSecondClose,
  } = useDisclosure(); // Secondary Modal
  const [currentImage, setCurrentImage] = useState("");

  const [currentTransaction, setCurrentTransaction] = useState(null); // Track selected transaction

  // Fetch data function
  const fetchData = async () => {
    try {
      const result = await axios.get(`${baseUrl}/api/DonePurchased`, {
        withCredentials: true,
      });
      setData(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Poll data every 5 seconds for real-time updates
  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 5000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  // Delete transaction row
  const deleteRow = (id) => {
    axios
      .delete(`${baseUrl}/api/DonePurchased/${id}`)
      .then(() => {
        setData(data.filter((data) => data._id !== id));
        onClose();
        onSecondClose();
      })
      .catch((err) => {
        console.log("Error removing data", err);
      });
  };

  // Handle opening the primary modal and setting the current transaction
  const openDetailsModal = (transaction) => {
    setCurrentTransaction(transaction);
    onOpen(); // Open primary modal
  };
  const buttonStatus = async (newStatus) => {
    if (currentTransaction) {
      try {
        await Promise.all([
          axios.put(`${baseUrl}/api/DonePurchased/${currentTransaction._id}`, {
            transactionStatus: newStatus,
          }),
          axios.put(
            `${baseUrl}/api/transactionStatus/${currentTransaction.cartId}`,
            {
              transactionStatus: newStatus,
            }
          ),
        ]);

        // Update the data array with the new status
        setData((prevData) =>
          prevData.map((item) =>
            item._id === currentTransaction._id
              ? { ...item, transactionStatus: newStatus }
              : item
          )
        );

        onClose();
        onSecondClose();
      } catch (err) {
        console.log("Error updating transaction status", err);
      }
    }
  };

  const pendingCard = () => {
    return (
      <Box mt={5} minHeight="60vh">
        <Card variant="outline" mx={10}>
          <CardHeader>
            <Heading size="xs">Pending Table</Heading>
          </CardHeader>
          <CardBody>
            <TableContainer>
              <Table variant="striped" colorScheme="gray">
                <Thead>
                  <Tr>
                    <Th>Transact Image</Th>
                    <Th>Product Name</Th>
                    <Th>Seller Name & Email</Th>
                    <Th>Buyer Name & Email</Th>

                    <Th>Method</Th>

                    <Th>Qnty</Th>
                    <Th>Price</Th>
                    <Th>Total</Th>
                    <Th>Tax</Th>
                    <Th>Transact date</Th>
                    <Th>Transact Status</Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data && data.length > 0 ? (
                    data
                      .filter((order) => order.transactionStatus === undefined)
                      .map((transaction) => (
                        <Tr key={transaction._id} className="text-xs">
                          <Td>
                            <img
                              src={transaction.picture}
                              className="w-20 h-20 rounded-lg cursor-pointer border-dashed border-2 border-gray-500 hover:animate-pulse"
                              onClick={() => {
                                setIsOpen(true);
                                setCurrentImage(transaction.picture);
                              }}
                            />
                          </Td>
                          <Td>{transaction.prodName}</Td>
                          <Td>
                            {transaction.sellerName} <br />
                            {transaction.sellerEmail}
                          </Td>
                          <Td>
                            {transaction.buyerName} <br />
                            {transaction.buyerEmail}
                          </Td>

                          <Td>{transaction.status}</Td>

                          <Td>{transaction.quantity}</Td>
                          <Td>
                            {new Intl.NumberFormat("en-PH", {
                              style: "currency",
                              currency: "PHP",
                            }).format(transaction.price)}
                          </Td>
                          <Td>
                            {new Intl.NumberFormat("en-PH", {
                              style: "currency",
                              currency: "PHP",
                            }).format(transaction.total)}
                          </Td>
                          <Td>
                            {new Intl.NumberFormat("en-PH", {
                              style: "currency",
                              currency: "PHP",
                            }).format(transaction.tax)}
                          </Td>
                          <Td>
                            {new Date(
                              transaction.createdAt
                            ).toLocaleDateString()}
                          </Td>
                          {transaction.transactionStatus === undefined ? (
                            <>
                              <Td>Pending</Td>
                            </>
                          ) : (
                            <>
                              <Td>{transaction.transactionStatus}</Td>
                            </>
                          )}
                          <Td className="space-x-2">
                            <IconButton
                              colorScheme="green"
                              icon={<LuBoxSelect />}
                              onClick={() => openDetailsModal(transaction)}
                            />
                          </Td>
                        </Tr>
                      ))
                  ) : (
                    <Tr>
                      <Td colSpan={16} textAlign="center">
                        No data available
                      </Td>
                    </Tr>
                  )}
                </Tbody>
              </Table>
            </TableContainer>
          </CardBody>
        </Card>
      </Box>
    );
  };

  const successCard = () => {
    return (
      <Box minHeight="60vh">
        <Card variant="outline" mx={10}>
          <CardHeader>
            <Heading size="xs">Success Card</Heading>
          </CardHeader>
          <CardBody>
            <TableContainer>
              <Table variant="striped" colorScheme="gray">
                <Thead>
                  <Tr>
                    <Th>Transact Image</Th>
                    <Th>Product Name</Th>
                    <Th>Seller Name & Email</Th>
                    <Th>Buyer Name & Email</Th>

                    <Th>Method</Th>

                    <Th>Qnty</Th>
                    <Th>Price</Th>
                    <Th>Total</Th>
                    <Th>Tax</Th>
                    <Th>Transact date</Th>
                    <Th>Transact Status</Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data && data.length > 0 ? (
                    data
                      .filter((order) => order.transactionStatus === "Success")
                      .map((transaction) => (
                        <Tr key={transaction._id} className="text-xs">
                          <Td>
                            <img
                              src={transaction.picture}
                              className="w-20 h-20 rounded-lg cursor-pointer border-dashed border-2 border-gray-500 hover:animate-pulse"
                              onClick={() => {
                                setIsOpen(true);
                                setCurrentImage(transaction.picture);
                              }}
                            />
                          </Td>
                          <Td>{transaction.prodName}</Td>
                          <Td>
                            {transaction.sellerName} <br />
                            {transaction.sellerEmail}
                          </Td>
                          <Td>
                            {transaction.buyerName} <br />
                            {transaction.buyerEmail}
                          </Td>

                          <Td>{transaction.status}</Td>

                          <Td>{transaction.quantity}</Td>
                          <Td>
                            {new Intl.NumberFormat("en-PH", {
                              style: "currency",
                              currency: "PHP",
                            }).format(transaction.price)}
                          </Td>
                          <Td>
                            {new Intl.NumberFormat("en-PH", {
                              style: "currency",
                              currency: "PHP",
                            }).format(transaction.total)}
                          </Td>
                          <Td>
                            {new Intl.NumberFormat("en-PH", {
                              style: "currency",
                              currency: "PHP",
                            }).format(transaction.tax)}
                          </Td>
                          <Td>
                            {new Date(
                              transaction.createdAt
                            ).toLocaleDateString()}
                          </Td>
                          {transaction.transactionStatus === undefined ? (
                            <>
                              <Td>Pending</Td>
                            </>
                          ) : (
                            <>
                              <Td>{transaction.transactionStatus}</Td>
                            </>
                          )}
                          <Td className="space-x-2">
                            <IconButton
                              colorScheme="green"
                              icon={<LuBoxSelect />}
                              onClick={() => openDetailsModal(transaction)}
                            />
                          </Td>
                        </Tr>
                      ))
                  ) : (
                    <Tr>
                      <Td colSpan={16} textAlign="center">
                        No data available
                      </Td>
                    </Tr>
                  )}
                </Tbody>
              </Table>
            </TableContainer>
          </CardBody>
        </Card>
      </Box>
    );
  };

  const returnedCard = () => {
    return (
      <Box minHeight="60vh">
        <Card variant="outline" mx={10}>
          <CardHeader>
            <Heading size="xs">Returned Items Tabled</Heading>
          </CardHeader>
          <CardBody>
            <TableContainer>
              <Table variant="striped" colorScheme="gray">
                <Thead>
                  <Tr>
                    <Th>Transact Image</Th>
                    <Th>Product Name</Th>
                    <Th>Seller Name & Email</Th>
                    <Th>Buyer Name & Email</Th>

                    <Th>Method</Th>

                    <Th>Qnty</Th>
                    <Th>Price</Th>
                    <Th>Total</Th>
                    <Th>Tax</Th>
                    <Th>Transact date</Th>
                    <Th>Transact Status</Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data && data.length > 0 ? (
                    data
                      .filter(
                        (order) => order.transactionStatus === "Item Returned"
                      )
                      .map((transaction) => (
                        <Tr key={transaction._id} className="text-xs">
                          <Td>
                            <img
                              src={transaction.picture}
                              className="w-20 h-20 rounded-lg cursor-pointer border-dashed border-2 border-gray-500 hover:animate-pulse"
                              onClick={() => {
                                setIsOpen(true);
                                setCurrentImage(transaction.picture);
                              }}
                            />
                          </Td>
                          <Td>{transaction.prodName}</Td>
                          <Td>
                            {transaction.sellerName} <br />
                            {transaction.sellerEmail}
                          </Td>
                          <Td>
                            {transaction.buyerName} <br />
                            {transaction.buyerEmail}
                          </Td>

                          <Td>{transaction.status}</Td>

                          <Td>{transaction.quantity}</Td>
                          <Td>
                            {new Intl.NumberFormat("en-PH", {
                              style: "currency",
                              currency: "PHP",
                            }).format(transaction.price)}
                          </Td>
                          <Td>
                            {new Intl.NumberFormat("en-PH", {
                              style: "currency",
                              currency: "PHP",
                            }).format(transaction.total)}
                          </Td>
                          <Td>
                            {new Intl.NumberFormat("en-PH", {
                              style: "currency",
                              currency: "PHP",
                            }).format(transaction.tax)}
                          </Td>
                          <Td>
                            {new Date(
                              transaction.createdAt
                            ).toLocaleDateString()}
                          </Td>
                          {transaction.transactionStatus === undefined ? (
                            <>
                              <Td>Pending</Td>
                            </>
                          ) : (
                            <>
                              <Td>{transaction.transactionStatus}</Td>
                            </>
                          )}
                          <Td className="space-x-2">
                            <IconButton
                              colorScheme="green"
                              icon={<LuBoxSelect />}
                              onClick={() => openDetailsModal(transaction)}
                            />
                          </Td>
                        </Tr>
                      ))
                  ) : (
                    <Tr>
                      <Td colSpan={16} textAlign="center">
                        No data available
                      </Td>
                    </Tr>
                  )}
                </Tbody>
              </Table>
            </TableContainer>
          </CardBody>
        </Card>
      </Box>
    );
  };
  return (
    <div>
      {pendingCard()}
      {successCard()}
      {returnedCard()}
      <Lightbox
        open={areOpen}
        close={() => setIsOpen(false)}
        slides={[{ src: currentImage }]}
        plugins={[Zoom]}
      />
      {/* Primary Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size={"lg"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="font-poppins">
            Transaction Details
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody className="text-sm font-poppins space-y-2 grid">
            {currentTransaction && (
              <>
                <p>
                  <strong>Product Name:</strong> {currentTransaction.prodName}
                </p>
                <p>
                  <strong>Seller:</strong> {currentTransaction.sellerName}
                </p>
                <p>
                  <strong>Buyer:</strong> {currentTransaction.buyerName}
                </p>
                <p>
                  <strong>Payment Method:</strong> {currentTransaction.status}
                </p>
                <p className="grid grid-cols-2 justify-start justify-items-center pt-5 pb-2 ">
                  <p>
                    <strong>Quantity:</strong> {currentTransaction.quantity}
                  </p>

                  <p>
                    <strong>Price:</strong>{" "}
                    {new Intl.NumberFormat("en-PH", {
                      style: "currency",
                      currency: "PHP",
                    }).format(currentTransaction.price)}
                  </p>
                  <p>
                    <strong>Total:</strong>{" "}
                    {new Intl.NumberFormat("en-PH", {
                      style: "currency",
                      currency: "PHP",
                    }).format(currentTransaction.total)}
                  </p>
                  <p>
                    <strong className="mr-2">Tax:</strong>{" "}
                    {new Intl.NumberFormat("en-PH", {
                      style: "currency",
                      currency: "PHP",
                    }).format(currentTransaction.tax)}
                  </p>
                </p>
                <img
                  src={currentTransaction.picture}
                  className="w-64 mx-24 bg-cover h-52 rounded-lg cursor-pointer border-dashed border-2 border-gray-500"
                  onClick={() => {
                    setIsOpen(true);
                    setCurrentImage(currentTransaction.picture);
                  }}
                />
                {/* Button to open secondary modal */}
              </>
            )}
          </ModalBody>
          <ModalFooter mx={36} gap={2}>
            <Button onClick={onSecondOpen} colorScheme="teal">
              More Details
            </Button>
            <Button colorScheme="gray" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Secondary Modal inside the first modal */}
      <Modal isOpen={isSecondOpen} onClose={onSecondClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="font-poppins">
            More Detailed Information
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody className="text-sm font-poppins space-y-2">
            {currentTransaction && (
              <>
                <p>
                  <strong>Account Emails:</strong>
                </p>
                <p className="space-y-1">
                  <a href={currentTransaction.sellerEmail}>
                    <p className="flex gap-2">
                      Seller:
                      <p className="underline">
                        {currentTransaction.sellerEmail}
                      </p>
                    </p>
                  </a>
                  <a href={currentTransaction.buyerEmail}>
                    <p className="flex gap-2">
                      Buyer:
                      <p className="underline">
                        {currentTransaction.buyerEmail}
                      </p>
                    </p>
                  </a>
                </p>

                <p>
                  <strong>Facebook Links:</strong>
                </p>
                <p className="space-y-1">
                  <a href={currentTransaction.sellerFacebook}>
                    <p className="flex gap-2">
                      Seller:
                      <p className="underline">
                        {currentTransaction.sellerFacebook}
                      </p>
                    </p>
                  </a>
                  <a href={currentTransaction.buyerFacebook}>
                    <p className="flex gap-2">
                      Buyer:
                      <p className="underline">
                        {currentTransaction.buyerFacebook}
                      </p>
                    </p>
                  </a>
                </p>

                <p>
                  <strong>Transaction sent:</strong>{" "}
                  {new Date(currentTransaction.createdAt).toLocaleDateString()}
                </p>
                <figure className="space-y-2">
                  <p>
                    <strong>Buyer Account:</strong>{" "}
                    {currentTransaction.buyerType}
                  </p>
                  <p>
                    <strong>Seller Account:</strong>{" "}
                    {currentTransaction.accountType}
                  </p>
                  <p>
                    <strong>buyerPhoneNumber:</strong>{" "}
                    {currentTransaction.buyerPhoneNumber}
                  </p>
                  <p>
                    <strong>buyerGcashNumber:</strong>{" "}
                    {currentTransaction.buyerGcashNumber}
                  </p>
                  <p>
                    <strong>sellerPhoneNumber:</strong>{" "}
                    {currentTransaction.sellerPhoneNumber}
                  </p>
                  <p>
                    <strong>sellerGcashNumber:</strong>{" "}
                    {currentTransaction.sellerGcashNumber}
                  </p>
                </figure>
                <p>
                  <strong>Type:</strong> {currentTransaction.types}
                </p>
                <p>
                  <strong>Message:</strong> {currentTransaction.message}
                </p>
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Tooltip label="Return this item?">
              <Button
                colorScheme="orange"
                mr={3}
                onClick={() => buttonStatus("Item Returned")}
              >
                <TbTruckReturn />
              </Button>
            </Tooltip>
            <Tooltip label="Finish review? Check this transaction if it is complete.">
              <Button
                colorScheme="green"
                mr={3}
                onClick={() => buttonStatus("Success")}
              >
                <MdCheck />
              </Button>
            </Tooltip>
            <Tooltip label="Delete this transaction.">
              <IconButton
                mr={3}
                colorScheme="red"
                icon={<DeleteIcon />}
                onClick={() => deleteRow(currentTransaction._id)}
              />
            </Tooltip>
            <Button colorScheme="yellow" onClick={onSecondClose}>
              <MdKeyboardReturn />
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Transactions;
