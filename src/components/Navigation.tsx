import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

const navigation = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Licenses', href: '/dashboard/licenses' },
  { name: 'Generate', href: '/dashboard/generate' },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Navigation() {
  const pathname = usePathname()
  const router = useRouter()
  const token = typeof window !== 'undefined' ? Cookies.get('token') : null

  const handleLogout = () => {
    Cookies.remove('token')
    router.push('/login')
  }

  return (
    <Disclosure as="nav" className="bg-dark-bg-secondary border-b border-dark-border">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between items-center">
              <div className="flex">
                <div className="flex flex-shrink-0 items-center">
                  <span className="text-xl font-bold text-dark-text-primary">License Manager</span>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        pathname === item.href
                          ? 'border-dark-accent text-dark-text-primary'
                          : 'border-transparent text-dark-text-secondary hover:border-dark-border hover:text-dark-text-primary',
                        'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium'
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-4">
                {/* Logout Icon */}
                {token && (
                  <button
                    onClick={handleLogout}
                    title="Logout"
                    className="bg-dark-bg-primary border border-dark-border rounded-full p-2 shadow hover:bg-dark-bg-secondary transition"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-[#ff8800]">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M18 12H9m0 0l3-3m-3 3l3 3" />
                    </svg>
                  </button>
                )}
                <div className="-mr-2 flex items-center sm:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-dark-text-secondary hover:bg-dark-bg-primary hover:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-dark-accent">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={Link}
                  href={item.href}
                  className={classNames(
                    pathname === item.href
                      ? 'bg-dark-bg-primary border-dark-accent text-dark-text-primary'
                      : 'border-transparent text-dark-text-secondary hover:bg-dark-bg-primary hover:border-dark-border hover:text-dark-text-primary',
                    'block border-l-4 py-2 pl-3 pr-4 text-base font-medium'
                  )}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
} 