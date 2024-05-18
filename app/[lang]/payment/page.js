import PaymentForm from "@/components/payment/PaymentForm";

export default function PaymentPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Payment Information
        </h2>
        <PaymentForm />
      </div>
    </div>
  );
}
