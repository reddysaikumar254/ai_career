import React from "react"
import WelcomeBanner from "./_components/WelcomeBanner"
import AiTools from "./_components/AiToolsList"
import History from "./_components/History"

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">

      <div className="
        max-w-7xl 
        mx-auto 
        px-4 sm:px-6 lg:px-8 
        py-6 sm:py-8 
        space-y-6 sm:space-y-8
      ">

        <WelcomeBanner />

        <AiTools />

        <History />

      </div>

    </div>
  )
}

export default Dashboard