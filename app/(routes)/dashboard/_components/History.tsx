"use client";

import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { aiToolsList } from "./AiToolsList";
import {
  EyeOpenIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";

/* ---------- Types ---------- */
type HistoryItem = {
  id: number;
  recordId: string;
  aiAgentType: string;
  createdAt: string;
};

const ITEMS_PER_PAGE = 6;
const PAGE_WINDOW = 5;

const History = () => {
  const [userHistory, setUserHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  /* ================= FETCH ================= */
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const result = await axios.get("/api/history");

        const sorted = (result.data || []).sort(
          (a: HistoryItem, b: HistoryItem) =>
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
        );

        setUserHistory(sorted);
      } catch (error: any) {
        if (![401, 500].includes(error.response?.status)) {
          console.error("Failed to fetch history:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  /* ================= HELPERS ================= */
  const getAgent = (path: string) =>
    aiToolsList.find((item) => item.path === path);

  const formatDate = (date: string) =>
    new Date(date).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  /* ================= FILTER ================= */
  const filteredHistory = useMemo(() => {
    if (!searchQuery.trim()) return userHistory;

    return userHistory.filter((history) => {
      const agent = getAgent(history.aiAgentType);
      return agent?.name
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());
    });
  }, [userHistory, searchQuery]);

  /* ================= PAGINATION ================= */
  const totalPages = Math.ceil(filteredHistory.length / ITEMS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const paginatedHistory = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredHistory.slice(start, start + ITEMS_PER_PAGE);
  }, [currentPage, filteredHistory]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  /* ===== 5 PAGE WINDOW LOGIC ===== */
  const visiblePages = useMemo(() => {
    let start =
      Math.floor((currentPage - 1) / PAGE_WINDOW) * PAGE_WINDOW + 1;

    let end = start + PAGE_WINDOW - 1;

    if (end > totalPages) {
      end = totalPages;
    }

    return Array.from(
      { length: end - start + 1 },
      (_, i) => start + i
    );
  }, [currentPage, totalPages]);

  return (
   <div className="mt-6 p-4 sm:p-6 lg:p-8 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">

      {/* ================= HEADER ================= */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center">
            <ClockIcon className="w-5 h-5 text-neutral-600 dark:text-neutral-300" />
          </div>
          <div>
            <h2 className="font-semibold text-xl text-neutral-900 dark:text-neutral-100">
              Previous Activity
            </h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              View your recent AI interactions
            </p>
          </div>
        </div>

        {/* SEARCH */}
       <div className="relative w-full sm:w-64">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <Input
            placeholder="Search tool..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-neutral-50 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700"
          />
        </div>
      </div>

      {/* ================= LIST ================= */}
      {loading ? (
        <div className="space-y-4">
          {[...Array(ITEMS_PER_PAGE)].map((_, index) => (
            <Skeleton key={index} className="h-16 w-full rounded-xl" />
          ))}
        </div>
      ) : filteredHistory.length === 0 ? (
        <div className="text-center py-20 text-neutral-500 dark:text-neutral-400">
          <ClockIcon className="w-10 h-10 mx-auto mb-4 opacity-40" />
          <p>No matching activity found.</p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {paginatedHistory.map((history) => {
              const agent = getAgent(history.aiAgentType);

              return (
                <Link
                  key={history.id}
                  href={`${history.aiAgentType}/${history.recordId}`}
                  className="group flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 sm:p-5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <Image
                      src={agent?.icon || "/default-icon.png"}
                      alt="icon"
                      width={32}
                      height={32}
                    />
                    <div>
                      <h3 className="font-medium text-neutral-900 dark:text-neutral-100">
                        {agent?.name || "Unknown Tool"}
                      </h3>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                        {formatDate(history.createdAt)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-neutral-900 text-white text-sm font-medium dark:bg-neutral-100 dark:text-black w-fit">
                    <EyeOpenIcon className="w-4 h-4" />
                    View
                  </div>
                </Link>
              );
            })}
          </div>

          {/* ================= PAGINATION ================= */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 sm:gap-3 mt-8 sm:mt-10 flex-wrap">

              {/* Prev */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`
    px-4 py-2 rounded-lg border
    border-neutral-300 dark:border-neutral-700
    flex items-center justify-center
    transition-all
    ${currentPage === 1
                    ? "bg-neutral-200 dark:bg-neutral-800 text-neutral-400 cursor-not-allowed"
                    : "bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-100"
                  }
  `}
              >
                <ChevronLeftIcon className="w-4 h-4" />
              </button>

              {/* 5 Page Window */}
              {visiblePages.map((page) => {
                const isActive = page === currentPage;

                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${isActive
                      ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-black"
                      : "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                      }`}
                  >
                    {page}
                  </button>
                );
              })}

              {/* Next */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`
    px-4 py-2 rounded-lg border
    border-neutral-300 dark:border-neutral-700
    flex items-center justify-center
    transition-all
    ${currentPage === totalPages
                    ? "bg-neutral-200 dark:bg-neutral-800 text-neutral-400 cursor-not-allowed"
                    : "bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-100"
                  }
  `}
              >
                <ChevronRightIcon className="w-4 h-4" />
              </button>

            </div>
          )}
        </>
      )}
    </div>
  );
};

export default History;