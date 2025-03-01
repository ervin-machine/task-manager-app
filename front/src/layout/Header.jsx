import React from 'react'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import ThemeToggle from '../components/ThemeToggle'
import ChangeLanguage from '../components/ChangeLanguage'
import UserMenu from '../features/User/components/UserMenu'

import { selectToken } from '../features/User/store/selectors'
import { logoutUser } from '../features/User/store/actions';

function Header({ logoutUser, token }) {
  return (
    <header>
        <div className="bg-gradient-to-r from-slate-50 to-indigo-400 border-b border-gray-200 dark:bg-gradient-to-r dark:from-slate-50 dark:to-teal-600">
            <div className="px-4 mx-auto sm:px-6 lg:px-8">
                <nav className="relative flex items-center justify-between h-16 lg:h-20">
                    <div className="flex items-center space-x-10">
                        <p>Task Manager</p>
                    </div>
    
                    <div className="flex items-center space-x-10 h-16">
                        <ChangeLanguage />
                        <ThemeToggle />
                        {token && <UserMenu logoutUser={logoutUser} />}
                    </div>
                </nav>
            </div>
        </div>
    </header>
  )
}

const mapStateToProps = createStructuredSelector({
    token: selectToken(),
  });
  
  const mapDispatchToProps = dispatch => {
    return {
        logoutUser: () => {
          dispatch(logoutUser())
        }
    }
  }
  
  const withConnect = connect(mapStateToProps, mapDispatchToProps)
  export default (withConnect)(Header);