import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import AdminOrderDetailsView from "./orderDetails";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrder,
  getOrderDetailsById,
  resetOrderDetails,
} from "../../store/admin/order-slice";
import { Badge } from "../ui/badge";

function AdminOrdersView() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const dispatch = useDispatch();
  const { orderList, orderDetails } = useSelector((state) => state.adminOrder);

  function handleOrderDetails(getId) {
    dispatch(getOrderDetailsById(getId));
  }

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);

  useEffect(() => {
    dispatch(getAllOrder());
  }, [dispatch]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>Payment Status</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {orderList.map((orderItem) => (
              <TableRow>
                <TableCell>{orderItem?._id}</TableCell>
                <TableCell>{orderItem?.orderDate.split("T")[0]}</TableCell>
                <TableCell>
                  <Badge
                    className={`${
                      orderItem?.orderStatus === "delivered"
                        ? "bg-green-600" : orderItem?.orderStatus === "rejected" ? "bg-red-600" 
                        : "bg-black"
                    } px-3 py-2 `}
                  >
                    {orderItem?.orderStatus}
                  </Badge>
                </TableCell>
                <TableCell>${orderItem?.totalAmount}</TableCell>
                <TableCell>
                  <Badge
                    className={`${
                      orderItem?.paymentStatus === "paid"
                        ? "bg-blue-600"
                        : "bg-red-600"
                    } px-3 py-2`}
                  >
                    {orderItem?.paymentStatus}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Dialog
                    open={openDetailsDialog}
                    onOpenChange={() => {
                        setOpenDetailsDialog(false);
                        dispatch(resetOrderDetails());
                    }}
                  >
                    <Button onClick={() => handleOrderDetails(orderItem?._id)}>
                      View Details
                    </Button>
                    <AdminOrderDetailsView orderDetails={orderDetails} />
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default AdminOrdersView;
