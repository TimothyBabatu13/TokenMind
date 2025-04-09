'use client';

const FooterYear = () => {
    const date = new Date();
    const year = date.getFullYear()
  return (
    <span>
        {year}
    </span>
  )
}

export default FooterYear