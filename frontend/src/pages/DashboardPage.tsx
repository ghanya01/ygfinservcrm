import React from 'react'
import { Users, UserPlus, Briefcase, Calendar, TrendingUp, ArrowUpRight } from 'lucide-react'

const DashboardPage: React.FC = () => {
  // Mock data - in real app, this would come from API
  const stats = [
    { name: 'Total Clients', value: '248', icon: Users, change: '+12%', changeType: 'positive' },
    { name: 'Active Leads', value: '67', icon: UserPlus, change: '+8%', changeType: 'positive' },
    { name: 'Open Deals', value: '34', icon: Briefcase, change: '+15%', changeType: 'positive' },
    { name: 'This Month Activities', value: '156', icon: Calendar, change: '+23%', changeType: 'positive' },
  ]

  const recentActivities = [
    { id: 1, type: 'CALL', title: 'Follow-up call with Rajesh Kumar', client: 'Rajesh Kumar', time: '2 hours ago' },
    { id: 2, type: 'MEETING', title: 'Investment consultation', client: 'Priya Sharma', time: '4 hours ago' },
    { id: 3, type: 'EMAIL', title: 'Sent proposal for mutual funds', client: 'Amit Patel', time: '6 hours ago' },
    { id: 4, type: 'TASK', title: 'Document verification completed', client: 'Sunita Devi', time: '1 day ago' },
  ]

  const upcomingTasks = [
    { id: 1, title: 'Call Mohan Singh about insurance renewal', due: 'Today, 2:00 PM', priority: 'HIGH' },
    { id: 2, title: 'Prepare investment report for Neha Gupta', due: 'Tomorrow, 10:00 AM', priority: 'MEDIUM' },
    { id: 3, title: 'Follow up on pending KYC documents', due: 'Dec 28, 3:00 PM', priority: 'LOW' },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Dashboard
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Welcome back! Here's what's happening with your CRM today.
          </p>
        </div>
        <div className="mt-4 flex md:ml-4 md:mt-0">
          <button className="btn btn-primary">
            <UserPlus className="h-4 w-4 mr-2" />
            Add New Lead
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="card">
            <div className="card-body">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon className="h-6 w-6 text-primary-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
                      <div className="ml-2 flex items-baseline text-sm font-semibold text-success-600">
                        <ArrowUpRight className="h-4 w-4 flex-shrink-0 self-center" />
                        <span className="sr-only">Increased by</span>
                        {stat.change}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Activities */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-medium text-gray-900">Recent Activities</h3>
          </div>
          <div className="card-body p-0">
            <div className="flow-root">
              <ul className="divide-y divide-gray-200">
                {recentActivities.map((activity) => (
                  <li key={activity.id} className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                          <Calendar className="h-4 w-4 text-primary-600" />
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {activity.title}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {activity.client}
                        </p>
                      </div>
                      <div className="flex-shrink-0 text-sm text-gray-500">
                        {activity.time}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="card-footer">
            <a href="/activities" className="text-sm font-medium text-primary-600 hover:text-primary-500">
              View all activities
            </a>
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-medium text-gray-900">Upcoming Tasks</h3>
          </div>
          <div className="card-body p-0">
            <div className="flow-root">
              <ul className="divide-y divide-gray-200">
                {upcomingTasks.map((task) => (
                  <li key={task.id} className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className={`h-3 w-3 rounded-full ${
                          task.priority === 'HIGH' ? 'bg-red-400' :
                          task.priority === 'MEDIUM' ? 'bg-yellow-400' : 'bg-green-400'
                        }`} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {task.title}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {task.due}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="card-footer">
            <a href="/activities" className="text-sm font-medium text-primary-600 hover:text-primary-500">
              View all tasks
            </a>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <button className="btn btn-secondary justify-start">
              <Users className="h-4 w-4 mr-2" />
              Add New Client
            </button>
            <button className="btn btn-secondary justify-start">
              <UserPlus className="h-4 w-4 mr-2" />
              Create Lead
            </button>
            <button className="btn btn-secondary justify-start">
              <Briefcase className="h-4 w-4 mr-2" />
              New Deal
            </button>
            <button className="btn btn-secondary justify-start">
              <TrendingUp className="h-4 w-4 mr-2" />
              Add Investment
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage