import { AppSidebar } from "@/components/sidebar/app-side-bar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/sonner"
import { Suspense } from "react"

const AppProvider = async ({ children } : {
    children: React.ReactNode
}) => {
  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar  />
      <SidebarInset>
        <Toaster
          position="top-center"
          theme="system"
          toastOptions={{
            className:
              "!bg-card !text-foreground !border-border/50 !shadow-[var(--shadow-float)]",
          }}
        />
        <Suspense fallback={<div className="flex h-dvh" />}>
         {children}
        </Suspense>
        
      </SidebarInset>
    </SidebarProvider>
  )
}

export default AppProvider