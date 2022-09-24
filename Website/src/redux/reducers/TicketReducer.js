const stateDefault = {
  ticketList: null,
  ticketLength: null,
  successDelete: null,
  loadingDeleteTicket: null
};

export const TicketReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case "GET_ALL_TICKET": {
      return {
        ...state,
        ticketList: action.ticket,
        ticketLength: action.length,
      };
    }
    case "DELETE_TICKET_SUCCESS": {
      console.log("action",action);
      return {
        ...state,
        loadingDeleteTicket: true,
        successDelete: action.ticket,
      };
    }
    case "PAYMENT_SUCCESS": {
      console.log("action",action);
      return {
        ...state,
        
      };
    }

    default:
      return { ...state };
  }
};
