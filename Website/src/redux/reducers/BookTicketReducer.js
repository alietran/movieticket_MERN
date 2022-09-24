const stateDefault = {
  loadingCreateShowtime: false,
  successCreateShowtime: null,
  errorCreateShowtime: null,
  showtimeList: null,
  loadingDeleteShowtime: false,
  successDeleteShowtime: null,
  errorDeleteShowtime: null,

  // get list seat
  loadingGetListSeat: false,
  danhSachPhongVe: {},
  errorGetListSeat: null,

  // booking ticked
  loadingBookingTicket: false,
  successBookingTicket: null,
  errorBookTicket: null,
  ticketList: [],

  // selecting seat
  listSeat: [],
  isSelectedSeat: false,
  listSeatSelected: [],
  seatCodes: [],
  amount: 0,

  idShowtime: null,
  successUpdateShowtime:null,
  successDetailShowtime:null,
  // taiKhoanNguoiDung: null,

  alertOver10: false,

  // payment
  email: "",
  phone: "",
  paymentMethod: "",
  isReadyPayment: false,
  activeStep: 0,

  timeOut: false,
  refreshKey: Date.now(),
};

export const BookTicketReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case "CREATE_SHOWTIME_REQUEST": {
      return {
        ...state,
        loadingCreateShowtime: true,
        errorCreateShowtime: null,
      };
    }
    case "CREATE_SHOWTIME_SUCCESS": {
      return {
        ...state,
        successCreateShowtime: action.payload.data,
        loadingCreateShowtime: false,
      };
    }
    case "CREATE_SHOWTIME_FAIL": {
      return {
        ...state,
        errorDeleteShowtime: action.payload.error,
        loadingDeleteShowtime: false,
      };
    }
    case "GET_ALL_SHOWTIME_SUCCESS": {
      return { ...state, showtimeList: action.showtime };
    }
    case "DELETE_SHOWTIME_REQUEST": {
      return {
        ...state,
        loadingDeleteShowtime: true,
        errorDeleteShowtime: null,
      };
    }
    case "DELETE_SHOWTIME_SUCCESS": {
      return {
        ...state,
        successDeleteShowtime: action.showtime,
        loadingDeleteShowtime: true,
      };
    }
    case "DELETE_SHOWTIME_FAIL": {
      return {
        ...state,
        errorDeleteShowtime: action.payload.error,
        loadingDeleteShowtime: false,
      };
    }

    case "RESET_CREATE_SHOWTIME": {
     state.successUpdateShowtime = null;
    //  state.loadingUpdateShowtime = false;
    //  state.errorUpdateShowtime = null;

      state.loadingCreateShowtime = false;
      state.successCreateShowtime = null;
      state.errorCreateShowtime = null;

      state.loadingDeleteShowtime = false;
      state.successDeleteShowtime = null;
      state.errorDeleteShowtime = null;
      return state;
    }
    case "GET_LISTSEAT_REQUEST": {
      return {
        ...state,
        loadingGetListSeat: true,
        errorGetListSeat: null,
       
      };
    }
    case "GET_LISTSEAT_SUCCESS": {
      console.log("action", action);
      return {
        ...state,
        danhSachPhongVe: action.showtime,
        loadingGetListSeat: false,
        successDetailShowtime: action.showtime,
      };
    }
    case "GET_LISTSEAT_FAIL": {
      return {
        ...state,
        errorGetListSeat: action.payload.error,
        loadingGetListSeat: false,
      };
    }
    // booking ticked
    case "BOOK_TICKET_REQUEST": {
      return {
        ...state,
        loadingBookingTicket: true,
        errorBookTicket: null,
      };
    }
    case "BOOK_TICKET_SUCCESS": {
      return {
        ...state,
        successBookingTicket: action.data,
        activeStep: 2,
        loadingBookingTicket: false,
      };
    }
    case "BOOK_TICKET_FAIL": {
      return {
        ...state,
        errorBookTicket: action.payload.error,
        loadingBookingTicket: false,
        activeStep: 2,
      };
    }
    case "CHANGE_LISTSEAT": {
      console.log("action", action);
      return {
        ...state,
        listSeat: action.payload.listSeat,
        isSelectedSeat: action.payload.isSelectedSeat,
        listSeatSelected: action.payload.listSeatSelected,
        seatCodes: action.payload.seatCodes,
        amount: action.payload.amount,
      };
    }
    case "RESET_DATA_BOOKTICKET": {
      return {
        ...state,
        danhSachPhongVe: {},
        paymentMethod: "",
        isReadyPayment: false,
        isSelectedSeat: false,
        listSeatSelected: [],
        timeOut: false,
        activeStep: 0,
        seatCodes: [],
        successBookingTicket: null,
        errorBookTicket: null,
        refreshKey: Date.now(),
        amount: 0,
        alertOver10: false,
      };
    }
    case "INIT_DATA": {
      console.log("action", action);
      return {
        ...state,
        listSeat: action.payload.listSeat,
        idShowtime: action.payload.idShowtime,
        userName: action.payload.userName,
        email: action.payload.email,
        phone: action.payload.phone,
      };
    }
    case "SET_DATA_PAYMENT": {
      return {
        ...state,
        email: action.payload.email,
        phone: action.payload.phone,
        paymentMethod: action.payload.paymentMethod,
      };
    }
    case "SET_READY_PAYMENT": {
      return {
        ...state,
        isReadyPayment: action.payload.isReadyPayment,
      };
    }
    // control modal
    case "TIMEOUT": {
      return {
        ...state,
        timeOut: true,
      };
    }
    case "SET_ALERT_OVER10": {
      return {
        ...state,
        alertOver10: true,
      };
    }
    case "RESET_ALERT_OVER10": {
      return {
        ...state,
        alertOver10: false,
      };
    }
    case "UPDATE_SHOWTIME": {
      console.log("action", action);
      return { ...state, successUpdateShowtime: action.showtime };
    }
    default:
      return { ...state };
  }
};
