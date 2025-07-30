import React from 'react'
import { Briefcase, Plus, Search } from 'lucide-react'

const DealsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Deals
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage your sales pipeline and track deal progress
          </p>
        </div>
        <div className="mt-4 flex md:ml-4 md:mt-0">
          <button className="btn btn-primary">
            <Plus className="h-4 w-4 mr-2" />
            Add New Deal
          </button>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">All Deals</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search deals..."
                className="form-input pl-10 w-64"
              />
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="text-center py-12">
            <Briefcase className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No deals found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Create deals to track your sales opportunities and revenue pipeline.
            </p>
            <div className="mt-6">
              <button className="btn btn-primary">
                <Plus className="h-4 w-4 mr-2" />
                Add Deal
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DealsPage