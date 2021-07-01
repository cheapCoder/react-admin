import { connect } from "react-redux";
import { increment, decrement, incrementAsync } from "../redux/actions/action";
import Counter from "../components/counter"

const mapStateToProps = state => ({ count: state });

const mapDispatchToProps = { increment, decrement, incrementAsync }

export default connect(mapStateToProps, mapDispatchToProps)(Counter)