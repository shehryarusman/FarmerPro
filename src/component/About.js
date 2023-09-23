import "../About.css";

function About() {
  return (
    <div>
      <div className="why">
        <div className="sections">
          <div className="section-1">
            <h1>Our&nbsp;</h1>
          </div>
          <div className="section-2">
            <h1>Why</h1>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="card">
          <div class="face face1">
            <div class="reason">
              <span class="stars"></span>
              <h2 class="java">Java</h2>
              <p class="java">
                Java is a class-based, object-oriented programming language that
                is designed to have as few implementation dependencies as
                possible.
              </p>
            </div>
          </div>
          <div class="face face2">
            <h2>01</h2>
          </div>
        </div>

        <div class="card">
          <div class="face face1">
            <div class="reason">
              <span class="stars"></span>
              <h2 class="python">Python</h2>
              <p class="python">
                Python is an interpreted, high-level and general-purpose
                programming language.
              </p>
            </div>
          </div>
          <div class="face face2">
            <h2>02</h2>
          </div>
        </div>

        <div class="card">
          <div class="face face1">
            <div class="reason">
              <span class="stars"></span>
              <h2 class="cSharp">C#</h2>
              <p class="cSharp">
                C# is a general-purpose, multi-paradigm programming language
                encompassing static typing, strong typing, lexically scoped and
                component-oriented programming disciplines.
              </p>
            </div>
          </div>
          <div class="face face2">
            <h2>03</h2>
          </div>
        </div>
      </div>
      <div className="footer">LMFAO</div>
    </div>
  );
}

export default About;
