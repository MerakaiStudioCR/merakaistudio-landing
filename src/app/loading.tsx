import MerakaiMark from '~/components/brand/merakai-mark'

const RootLoading = () => {
  return (
    <div className='flex min-h-[50vh] items-center justify-center'>
      <MerakaiMark
        className='motion-safe h-16 w-16 text-merakai-navy'
        title='Merakai Studio'
      />
    </div>
  )
}

export default RootLoading
