import React from 'react'
import { User, Mail, Phone, Calendar } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const ProfilePage: React.FC = () => {
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Profile
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage your account settings and personal information
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Profile Info */}
        <div className="lg:col-span-1">
          <div className="card">
            <div className="card-body text-center">
              <div className="h-20 w-20 rounded-full bg-primary-100 flex items-center justify-center mx-auto">
                <User className="h-10 w-10 text-primary-600" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                {user?.firstName} {user?.lastName}
              </h3>
              <p className="text-sm text-gray-500 capitalize">{user?.role.toLowerCase()}</p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-center text-sm text-gray-500">
                  <Mail className="h-4 w-4 mr-2" />
                  {user?.email}
                </div>
                {user?.phone && (
                  <div className="flex items-center justify-center text-sm text-gray-500">
                    <Phone className="h-4 w-4 mr-2" />
                    {user.phone}
                  </div>
                )}
                <div className="flex items-center justify-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-2" />
                  Joined {new Date(user?.createdAt || '').toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
            </div>
            <div className="card-body">
              <form className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="form-label">First Name</label>
                    <input
                      type="text"
                      className="form-input"
                      defaultValue={user?.firstName}
                    />
                  </div>
                  <div>
                    <label className="form-label">Last Name</label>
                    <input
                      type="text"
                      className="form-input"
                      defaultValue={user?.lastName}
                    />
                  </div>
                </div>

                <div>
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-input"
                    defaultValue={user?.email}
                    disabled
                  />
                </div>

                <div>
                  <label className="form-label">Phone</label>
                  <input
                    type="tel"
                    className="form-input"
                    defaultValue={user?.phone || ''}
                  />
                </div>

                <div>
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-input"
                    defaultValue={user?.username}
                    disabled
                  />
                </div>

                <div className="flex justify-end space-x-3">
                  <button type="button" className="btn btn-secondary">
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Change Password */}
          <div className="card mt-6">
            <div className="card-header">
              <h3 className="text-lg font-medium text-gray-900">Change Password</h3>
            </div>
            <div className="card-body">
              <form className="space-y-6">
                <div>
                  <label className="form-label">Current Password</label>
                  <input
                    type="password"
                    className="form-input"
                    placeholder="Enter current password"
                  />
                </div>

                <div>
                  <label className="form-label">New Password</label>
                  <input
                    type="password"
                    className="form-input"
                    placeholder="Enter new password"
                  />
                </div>

                <div>
                  <label className="form-label">Confirm New Password</label>
                  <input
                    type="password"
                    className="form-input"
                    placeholder="Confirm new password"
                  />
                </div>

                <div className="flex justify-end">
                  <button type="submit" className="btn btn-primary">
                    Update Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage