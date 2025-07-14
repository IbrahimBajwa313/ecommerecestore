"use client"

export function TopBanner() {
  return (
    <div className="w-full overflow-hidden bg-black border-b border-zinc-800">
      <div className="whitespace-nowrap animate-marquee text-white text-sm py-1 tracking-wide">
        <span className="inline-block px-8">
          🚚 Free Delivery Nationwide — 🎁 Order Now To Get a Voucher — 💫 Minimum Order Of Rs. 2000/- — 🎈 Follow On Insta To Get A Coupon —
        </span>
        {/* duplicate to ensure smooth looping */}
        <span className="inline-block px-8">
          🚚 Free Delivery Nationwide — 🎁 Order Now To Get a Voucher — 💫 Minimum Order Of Rs. 2000/- — 🎈 Follow On Insta To Get A Coupon —
        </span>
      </div>
    </div>
  )
}
