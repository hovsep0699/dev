import React from 'react';

const IconPanel = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width={17} height={17} viewBox="0 0 17 17" {...props}>
    <path d="M0 0v17h17V0H0zm16 16H1V1h15v15zM4 10.232V13h1v-2.768c.738-.218 1.281-.894 1.281-1.701S5.738 7.048 5 6.83V4H4v2.83c-.738.218-1.281.894-1.281 1.701S3.262 10.015 4 10.232zm.5-2.482a.782.782 0 010 1.562.781.781 0 010-1.562zm3.5.357V13h1V8.107c.738-.218 1.281-.894 1.281-1.701S9.738 4.923 9 4.705V4H8v.705c-.738.218-1.281.894-1.281 1.701S7.262 7.89 8 8.107zm.5-2.482a.782.782 0 11-.002 1.564.782.782 0 01.002-1.564zm4 7.792c.982 0 1.781-.799 1.781-1.781 0-.808-.543-1.483-1.281-1.701V4h-1v5.935a1.778 1.778 0 00-1.281 1.701c0 .982.799 1.781 1.781 1.781zm0-2.563a.782.782 0 010 1.562.782.782 0 010-1.562z" />
  </svg>
);

export default IconPanel;
