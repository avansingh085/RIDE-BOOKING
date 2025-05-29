import Payment from "../models/Payment.js";

// @desc Get all payments
// @route GET /payments
export const getAllPayments = async (req, res) => {
  try {
    console.log("OPPPPPPPPPPPPPPPPPPP")
    const payments = await Payment.find().sort({ createdAt: -1 });
    res.status(200).json(payments);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch payments", error: err.message });
  }
};

// @desc Update payment status
// @route PUT /payments/:id/status
export const updatePaymentStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['Success', 'Failed', 'Pending'].includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  try {
    const updated = await Payment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Payment not found" });
    }

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update status", error: err.message });
  }
};
