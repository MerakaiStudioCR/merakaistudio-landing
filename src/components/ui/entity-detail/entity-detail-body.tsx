import { Children, Fragment, isValidElement } from 'react'
import { cn } from '~/shared/lib/cn'

interface EntityDetailBodyProps {
  children: React.ReactNode
  className?: string
}

function flattenBodySections(children: React.ReactNode): React.ReactElement[] {
  const sections: React.ReactElement[] = []

  Children.forEach(children, (child) => {
    if (!isValidElement(child)) return

    if (child.type === Fragment) {
      const fragmentChild = child as React.ReactElement<{
        children?: React.ReactNode
      }>
      sections.push(...flattenBodySections(fragmentChild.props.children))
      return
    }

    sections.push(child)
  })

  return sections
}

const EntityDetailBody = ({ children, className }: EntityDetailBodyProps) => {
  const sections = flattenBodySections(children)

  return (
    <section
      className={cn(
        'floating-section flex flex-col gap-8 p-4 sm:p-5',
        className
      )}
    >
      {sections.map((section, index) => (
        <Fragment key={section.key ?? index}>
          {section}
          {index < sections.length - 1 ? (
            <div className='border-border border-t' />
          ) : null}
        </Fragment>
      ))}
    </section>
  )
}

export default EntityDetailBody
