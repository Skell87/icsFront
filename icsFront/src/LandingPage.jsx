import React from "react";
import "./App.css";

function LandingPage() {
  return (
    <div className="help">
      <h1>Welcome to PackMule: Your Ultimate Inventory Management Solution</h1>
      <p>
        Thank you for choosing PackMule, where we securely hold and organize
        your belongings. This app is dedicated to the hard work and guidance of
        Jason Mize, Reece Walters, Ember Borja, and all of the staff at Awesome
        Inc. Their support has been instrumental in the development of this app.
      </p>

      <h2>About PackMule</h2>
      <p>
        PackMule is a lightweight inventory app designed to help you store and
        track your items efficiently. Whether you are managing a warehouse or a
        small business, PackMule will help you catalog, organize, and maintain
        your items with ease.
      </p>

      <h2>Getting Started</h2>

      <p>
        Navigate to the Manage Storage page. Here, you will create your virtual
        storage space, which is organized into three levels: Area, Division, and
        Sub-Division. The Area is the highest level, representing your home or
        warehouse. Divisions are sub-sections of the Area, such as a kitchen or
        an aisle. Sub-Divisions are the lowest level, like a fridge or a bin
        within the Division.
      </p>

      <p>
        After creating your Areas, Divisions, and Sub-Divisions, they will be
        represented visually on the page.
      </p>

      <h2>Adding and Managing Inventory</h2>
      <p>
        Navigate to Manage Inventory. Add items to your Area, Division, and
        Sub-Division. You can include details such as name, make, model, color,
        quantity, and notes. Assign these items to your storage space and
        submit, and they will appear in the visualizer.
      </p>
      <p>
        On mobile, you can expand an item by pressing the "..." button. Update
        item details or use the search function to narrow down items.
      </p>
      <p>
        On desktop, you can access all mobile features and sort items by
        category by pressing the category headers at the top of the list.
      </p>

      <h2>Thank You!</h2>
      <p>
        I hope you enjoy using PackMule. This app is a product of hard work,
        dedication, and a wonderful learning journey. Thank you for your
        support, and have an amazing day!
      </p>

      <p>Happy organizing with PackMule!</p>
    </div>
  );
}

export default LandingPage;
