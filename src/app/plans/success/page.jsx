import { redirect } from "next/navigation";
import Link from "next/link";
// প্রিমিয়াম লুকের জন্য প্রয়োজনীয় আইকনগুলো ইম্পোর্ট করা হলো
import {
  CheckCircle2,
  Mail,
  HelpCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { stripe } from "@/lib/stripe";
import { email } from "better-auth";
import { createSubscription } from "@/lib/actions/subscriptions";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id)
    throw new Error("Please provide a valid session_id (`cs_test_...`)");

  const {
    status,
    customer_details: { email: customerEmail },
    metadata,
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete") {
    // update the user table about the new plan
    const subsInfo = {
      email: customerEmail,
      planId: metadata.planId,
    };

    const result = await createSubscription(subsInfo);
    console.log(result);

    return (
      <div className="min-h-screen bg-gradient-to-b from-base-200 to-base-300 flex items-center justify-center p-4">
        <div className="max-w-md w-full relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-success via-primary to-secondary rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>

          <div className="relative bg-base-100/80 backdrop-blur-xl rounded-3xl p-8 lg:p-10 shadow-2xl border border-base-200/60 overflow-hidden text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute -inset-2 bg-success/20 rounded-full blur-sm animate-pulse"></div>
                <div className="w-20 h-20 bg-success/10 text-success rounded-full flex items-center justify-center relative">
                  <CheckCircle2 className="w-12 h-12 stroke-[1.5]" />
                </div>
              </div>
            </div>

            <span className="badge badge-success badge-outline gap-1 px-3 py-2 text-[10px] font-bold tracking-widest uppercase mb-3 bg-success/5 border-success/30">
              <Sparkles className="w-3 h-3 text-success" /> Payment Received
            </span>
            <h1 className="text-3xl font-black text-base-content tracking-tight mb-3">
              Payment Successful!
            </h1>
            <p className="text-sm text-base-content/60 leading-relaxed mb-8">
              We appreciate your business! Your transaction was processed
              securely.
            </p>

            <div className="space-y-4 bg-base-200/50 border border-base-200/80 rounded-2xl p-5 text-left mb-8">
              <div className="flex gap-3 items-start">
                <div className="p-2 bg-primary/10 text-primary rounded-xl mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-base-content/40">
                    Confirmation Sent To
                  </h4>
                  <p className="text-sm font-semibold text-base-content break-all mt-0.5">
                    {customerEmail}
                  </p>
                </div>
              </div>

              <div className="border-t border-base-200/60 my-3"></div>

              <div className="flex gap-3 items-start">
                <div className="p-2 bg-secondary/10 text-secondary rounded-xl mt-0.5">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-base-content/40">
                    Have Questions?
                  </h4>
                  <p className="text-sm font-medium text-base-content/70 mt-0.5">
                    Feel free to contact us at{" "}
                    <a
                      href="mailto:orders@example.com"
                      className="text-secondary font-semibold hover:underline"
                    >
                      atikur.an638@gmail.com
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/jobs"
                className="btn btn-primary flex-1 h-12 min-h-[3rem] text-white font-bold rounded-xl shadow-lg shadow-primary/20 normal-case gap-2"
              >
                Start Applying <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
