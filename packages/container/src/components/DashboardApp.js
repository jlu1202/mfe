import { mount } from 'dashboard/DashboardApp';
import React, { useRef, useEffect } from 'react';


export default () => {
  const ref = useRef(null);
  // const history = useHistory();

    useEffect(() => {
        mount(ref.current);
    }, []);

    return <div ref={ref} />;
};
