# spec/models/task_spec.rb
require 'rails_helper'

RSpec.describe Task, type: :model do
  it "validates presence of title" do
    task = Task.new(title: nil)
    expect(task).not_to be_valid
    expect(task.errors[:title]).to include("can't be blank")
  end

  it "validates inclusion of status" do
    task = Task.new
    begin
      task.status = "invalid_status"
    rescue ArgumentError => e
      expect(e.message).to eq("'invalid_status' is not a valid status")
    end
  end
  context "when 50% of tasks are 'todo'" do
    before do
      Task.create!(title: "Task 1", status: :done)
      Task.create!(title: "Task 2", status: :done)
      Task.create!(title: "Task 3", status: :todo)
    end
  
    it "does not allow creation of new 'todo' task" do
      task = Task.new(title: "Task 4", status: :todo)
      expect(task).not_to be_valid
      expect(task.errors[:status]).to include("can't be 'To Do' as more than 50% of tasks would be 'To Do'")
    end
  
    it "allows creation of new 'done' task" do
      task = Task.new(title: "Task 5", status: :done)
      expect(task).to be_valid
    end
  end
end