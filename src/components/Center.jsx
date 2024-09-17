import styled from "styled-components";
import * as PropTypes from "prop-types";

function Center(props) {

  const Dividers = styled.div`
    display: flex;
    width: 100vw;
    flex-direction: row;
    justify-content: center;
    align-content: center`

    return (
        <Dividers>{props.children}</Dividers>
    )
  }

  Center.propTypes = {children: PropTypes.node};


export default Center
