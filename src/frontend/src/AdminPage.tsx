import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Loader2, ShieldCheck, Users, Zap } from "lucide-react";
import { useState } from "react";
import { useActor } from "./hooks/useActor";
import { useInternetIdentity } from "./hooks/useInternetIdentity";

type Inquiry = {
  id: bigint;
  name: string;
  contact: string;
  projectType: string;
  details: string;
  timestamp: bigint;
  done: boolean;
};

function formatTimestamp(ts: bigint): string {
  const ms = Number(ts / BigInt(1_000_000));
  return new Date(ms).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function BackToWebsite() {
  return (
    <button
      type="button"
      data-ocid="admin.link"
      onClick={() => {
        window.location.hash = "/";
      }}
      className="text-white/40 hover:text-white/70 text-xs transition-colors inline-flex items-center gap-1"
    >
      <ArrowLeft className="w-3 h-3" />
      Back to Website
    </button>
  );
}

export default function AdminPage() {
  const { identity, login, clear, isLoggingIn, isInitializing } =
    useInternetIdentity();
  const { actor, isFetching } = useActor();
  const queryClient = useQueryClient();
  const [adminChecked, setAdminChecked] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [claiming, setClaiming] = useState(false);
  const [claimError, setClaimError] = useState("");

  // Check admin status once actor is ready and user is logged in
  useQuery({
    queryKey: ["isAdmin", identity?.getPrincipal().toString()],
    queryFn: async () => {
      if (!actor || !identity) return false;
      const result = await (actor as any).isAdmin();
      setIsAdmin(!!result);
      setAdminChecked(true);
      return result;
    },
    enabled: !!actor && !isFetching && !!identity,
  });

  const { data: inquiries = [], isLoading: loadingInquiries } = useQuery<
    Inquiry[]
  >({
    queryKey: ["inquiries"],
    queryFn: async () => {
      if (!actor) return [];
      return (actor as any).getInquiries();
    },
    enabled: !!actor && !isFetching && isAdmin,
    refetchInterval: 30_000,
  });

  const markDoneMutation = useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("No actor");
      return (actor as any).markDone(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inquiries"] });
    },
  });

  const handleClaimAdmin = async () => {
    if (!actor) return;
    setClaiming(true);
    setClaimError("");
    try {
      const result = await (actor as any).claimAdmin();
      if (result) {
        setIsAdmin(true);
        queryClient.invalidateQueries({ queryKey: ["isAdmin"] });
      } else {
        setClaimError(
          "Admin already claimed by another user. Contact Volt & Victor.",
        );
      }
    } catch {
      setClaimError("Failed to claim admin. Try again.");
    } finally {
      setClaiming(false);
    }
  };

  // ─── Login Screen ──────────────────────────────────────────────────────────
  if (!identity) {
    return (
      <div className="min-h-screen bg-vv-navy flex flex-col">
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="w-full max-w-sm">
            <div className="text-center mb-10">
              <div className="w-16 h-16 rounded-2xl bg-vv-accent flex items-center justify-center mx-auto mb-5">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h1 className="font-display font-black text-white text-2xl uppercase tracking-tight mb-2">
                Volt & Victor
              </h1>
              <p className="text-white/50 text-sm">Admin Panel</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <h2 className="font-display font-bold text-white text-lg uppercase tracking-wide mb-2">
                Admin Login
              </h2>
              <p className="text-white/50 text-sm mb-8">
                Sign in with your Internet Identity to access the admin
                dashboard.
              </p>
              <Button
                data-ocid="admin.primary_button"
                onClick={login}
                disabled={isLoggingIn || isInitializing}
                className="w-full bg-vv-accent hover:bg-vv-accent/90 text-white font-bold uppercase tracking-widest text-sm py-6 rounded-sm"
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  "Login with Internet Identity"
                )}
              </Button>
            </div>

            <div className="mt-6 text-center">
              <BackToWebsite />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── Loading actor ─────────────────────────────────────────────────────────
  if (isFetching || !adminChecked) {
    return (
      <div className="min-h-screen bg-vv-navy flex items-center justify-center">
        <div className="text-center" data-ocid="admin.loading_state">
          <Loader2 className="w-10 h-10 text-vv-accent animate-spin mx-auto mb-4" />
          <p className="text-white/60 text-sm">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  // ─── Claim Admin ───────────────────────────────────────────────────────────
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-vv-navy flex flex-col">
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="w-full max-w-sm">
            <div className="text-center mb-10">
              <div className="w-16 h-16 rounded-2xl bg-vv-accent/20 border border-vv-accent/30 flex items-center justify-center mx-auto mb-5">
                <ShieldCheck className="w-8 h-8 text-vv-accent" />
              </div>
              <h2 className="font-display font-bold text-white text-xl uppercase tracking-tight mb-2">
                Claim Admin Access
              </h2>
              <p className="text-white/50 text-sm">
                No admin has been set up yet. Click below to become the admin.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              {claimError && (
                <div
                  className="mb-5 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm"
                  data-ocid="admin.error_state"
                >
                  {claimError}
                </div>
              )}
              <Button
                data-ocid="admin.primary_button"
                onClick={handleClaimAdmin}
                disabled={claiming}
                className="w-full bg-vv-accent hover:bg-vv-accent/90 text-white font-bold uppercase tracking-widest text-sm py-6 rounded-sm"
              >
                {claiming ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Claiming...
                  </>
                ) : (
                  "Claim Admin"
                )}
              </Button>
              <button
                type="button"
                onClick={clear}
                className="mt-4 w-full text-white/30 hover:text-white/60 text-xs transition-colors"
                data-ocid="admin.secondary_button"
              >
                Logout
              </button>
            </div>

            <div className="mt-6 text-center">
              <BackToWebsite />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── Admin Dashboard ───────────────────────────────────────────────────────
  const pending = inquiries.filter((i) => !i.done).length;
  const done = inquiries.filter((i) => i.done).length;

  return (
    <div className="min-h-screen bg-vv-navy">
      {/* Header */}
      <header className="bg-vv-navy-deep border-b border-white/10 px-6 py-4">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <BackToWebsite />
            <div className="w-px h-4 bg-white/10" />
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-vv-accent flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-bold text-white text-sm tracking-wide">
                Admin Dashboard
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={clear}
            data-ocid="admin.secondary_button"
            className="text-white/40 hover:text-white/70 text-xs transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto px-6 py-10">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            {
              label: "Total Inquiries",
              value: inquiries.length,
              icon: <Users className="w-5 h-5" />,
            },
            {
              label: "Pending",
              value: pending,
              icon: <Loader2 className="w-5 h-5" />,
              accent: true,
            },
            {
              label: "Completed",
              value: done,
              icon: <ShieldCheck className="w-5 h-5" />,
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white/5 border border-white/10 rounded-xl p-6"
            >
              <div
                className={`${
                  stat.accent ? "text-vv-accent" : "text-white/50"
                } mb-2`}
              >
                {stat.icon}
              </div>
              <div
                className={`font-display font-black text-3xl mb-1 ${
                  stat.accent ? "text-vv-accent" : "text-white"
                }`}
              >
                {stat.value}
              </div>
              <div className="text-white/50 text-xs uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Inquiries Table */}
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <div className="px-6 py-5 border-b border-white/10">
            <h2 className="font-display font-bold text-white text-sm uppercase tracking-widest">
              Project Inquiries
            </h2>
          </div>

          {loadingInquiries ? (
            <div className="py-20 text-center" data-ocid="admin.loading_state">
              <Loader2 className="w-8 h-8 text-vv-accent animate-spin mx-auto mb-3" />
              <p className="text-white/50 text-sm">Loading inquiries...</p>
            </div>
          ) : inquiries.length === 0 ? (
            <div className="py-20 text-center" data-ocid="admin.empty_state">
              <Users className="w-10 h-10 text-white/20 mx-auto mb-3" />
              <p className="text-white/40 text-sm">No inquiries yet.</p>
              <p className="text-white/25 text-xs mt-1">
                Inquiries from the contact form will appear here.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table data-ocid="admin.table">
                <TableHeader>
                  <TableRow className="border-white/10 hover:bg-transparent">
                    <TableHead className="text-white/50 text-xs uppercase tracking-wider font-bold">
                      Name
                    </TableHead>
                    <TableHead className="text-white/50 text-xs uppercase tracking-wider font-bold">
                      Contact
                    </TableHead>
                    <TableHead className="text-white/50 text-xs uppercase tracking-wider font-bold">
                      Project Type
                    </TableHead>
                    <TableHead className="text-white/50 text-xs uppercase tracking-wider font-bold">
                      Details
                    </TableHead>
                    <TableHead className="text-white/50 text-xs uppercase tracking-wider font-bold">
                      Date
                    </TableHead>
                    <TableHead className="text-white/50 text-xs uppercase tracking-wider font-bold">
                      Status
                    </TableHead>
                    <TableHead className="text-white/50 text-xs uppercase tracking-wider font-bold">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inquiries.map((inquiry, idx) => (
                    <TableRow
                      key={String(inquiry.id)}
                      className="border-white/10 hover:bg-white/5"
                      data-ocid={`admin.row.${idx + 1}`}
                    >
                      <TableCell className="text-white text-sm font-medium">
                        {inquiry.name}
                      </TableCell>
                      <TableCell className="text-white/70 text-sm">
                        {inquiry.contact}
                      </TableCell>
                      <TableCell className="text-white/70 text-sm">
                        {inquiry.projectType}
                      </TableCell>
                      <TableCell className="text-white/60 text-sm max-w-[200px]">
                        <span className="line-clamp-2" title={inquiry.details}>
                          {inquiry.details}
                        </span>
                      </TableCell>
                      <TableCell className="text-white/50 text-xs whitespace-nowrap">
                        {formatTimestamp(inquiry.timestamp)}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            inquiry.done
                              ? "bg-green-500/20 text-green-400 border-green-500/30 text-xs"
                              : "bg-vv-accent/20 text-vv-accent border-vv-accent/30 text-xs"
                          }
                          variant="outline"
                        >
                          {inquiry.done ? "Done" : "Pending"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {!inquiry.done && (
                          <Button
                            size="sm"
                            data-ocid={`admin.save_button.${idx + 1}`}
                            onClick={() => markDoneMutation.mutate(inquiry.id)}
                            disabled={
                              markDoneMutation.isPending &&
                              markDoneMutation.variables === inquiry.id
                            }
                            className="bg-white/10 hover:bg-vv-accent text-white text-xs font-bold uppercase tracking-wider px-3 py-1 h-auto rounded-sm"
                          >
                            {markDoneMutation.isPending &&
                            markDoneMutation.variables === inquiry.id ? (
                              <Loader2 className="w-3 h-3 animate-spin" />
                            ) : (
                              "Mark Done"
                            )}
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
